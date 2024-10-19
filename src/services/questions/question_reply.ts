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
import { handlerError } from "../../index.js";

class QuestionReply {
  public async showQuestionReplyModal(interaction: Interaction): Promise<void> {
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
      handlerError(interaction, err);
    }
  }

  public async questionReplyServices(interaction: Interaction): Promise<void> {
    try {
      const messageInteraction = interaction as MessageComponentInteraction;
      const originalEmbedFields = messageInteraction.message.embeds[0].fields;

      const modalTextInteraction = interaction as ModalSubmitInteraction;
      const questionReplay = modalTextInteraction.fields.getTextInputValue(
        "question_reply_input"
      );

      this.updateEmbed(interaction, originalEmbedFields);
      this.sendMessage(interaction, originalEmbedFields, questionReplay);
    } catch (err: unknown) {
      handlerError(interaction, err);
    }
  }

  private async updateEmbed(
    interaction: Interaction,
    originalEmbedFields: any
  ): Promise<void> {
    const updateEmbed = new EmbedBuilder()
      .setColor(embedColors.secondaryEmbedColor)
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
  ): Promise<void> {
    const responseEmbed = new EmbedBuilder()
      .setColor(embedColors.mainEmbedColor)
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
