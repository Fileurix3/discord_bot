import {
  ActionRowBuilder,
  EmbedBuilder,
  Interaction,
  MessageComponentInteraction,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { embedColors } from "../../constants.js";

class QuestionReply {
  public async showQuestionReplyModal(interaction: Interaction) {
    try {
      const modal = new ModalBuilder()
        .setCustomId("question_reply_modal")
        .setTitle("Answer this question");

      const questionInput = new TextInputBuilder()
        .setCustomId("question_reply_input")
        .setLabel("The answer to the question...")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const row = new ActionRowBuilder<TextInputBuilder>().addComponents(
        questionInput
      );
      modal.addComponents(row);

      await (interaction as any).showModal(modal);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      await (interaction as any).reply({
        content: "An error occurred: " + errorMessage,
        ephemeral: true,
      });
    }
  }

  public async questionReplyServices(interaction: Interaction) {
    try {
      const messageInteraction = interaction as MessageComponentInteraction;
      const originalEmbedFields = messageInteraction.message.embeds[0].fields;

      const modalTextInteraction = interaction as ModalSubmitInteraction;
      const questionReplay = modalTextInteraction.fields.getTextInputValue(
        "question_reply_input"
      );

      console.log(originalEmbedFields);

      this.updateEmbed(interaction, originalEmbedFields);
      this.sendMessage(interaction, originalEmbedFields, questionReplay);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      await (interaction as any).reply({
        content: "An error occurred: " + errorMessage,
        ephemeral: true,
      });
    }
  }

  private async updateEmbed(
    interaction: Interaction,
    originalEmbedFields: any
  ) {
    const updateEmbed = new EmbedBuilder()
      .setColor(embedColors.processedEmbedColor)
      .setTitle("The question has been answered")
      .addFields([
        {
          name: "answered by",
          value: `<@${interaction.user.id}>`,
          inline: false,
        },
      ])
      .setDescription(
        `
          **Sender:** ${originalEmbedFields[1]["value"]} 
          **Question:** ${originalEmbedFields[0]["value"]}
        `
      );

    await (interaction as any).update({
      embeds: [updateEmbed],
      components: [],
    });
  }

  private async sendMessage(
    interaction: Interaction,
    originalEmbedFields: any,
    questionReplay: string
  ) {
    const responseEmbed = new EmbedBuilder()
      .setColor(embedColors.defaultEmbedColor)
      .setTitle("Your question has been answered")
      .addFields([
        {
          name: "response",
          value: questionReplay,
          inline: false,
        },
        {
          name: "answered by",
          value: `<@${interaction.user.id}>`,
          inline: false,
        },
      ])
      .setDescription(
        `
          **Question:** ${originalEmbedFields[0]["value"]}
        `
      );

    const senderId = originalEmbedFields[1].value.match(/[0-9]+/g)[0];

    const sender = await interaction.client.users.fetch(senderId);

    if (!senderId) {
      console.error("Sender ID is null or not found");
      return;
    }

    await sender.send({ embeds: [responseEmbed] });
  }
}

export { QuestionReply };
