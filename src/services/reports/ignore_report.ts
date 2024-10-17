import { embedColors } from "../../constants.js";
import {
  EmbedBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
  Interaction,
  MessageComponentInteraction,
  ModalSubmitInteraction,
} from "discord.js";

class IgnoreReport {
  public async showIgnoredReportModal(interaction: Interaction) {
    try {
      const modal = new ModalBuilder()
        .setCustomId("ignore_report_feedback_modal")
        .setTitle("Feedback on this report");

      const feedbackInput = new TextInputBuilder()
        .setCustomId("ignore_report_feedback_input")
        .setLabel("Your Feedback")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const row = new ActionRowBuilder<TextInputBuilder>().addComponents(
        feedbackInput
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

  public async ignoreReportServices(interaction: Interaction): Promise<void> {
    try {
      const messageInteraction = interaction as MessageComponentInteraction;
      const originalEmbedFields = messageInteraction.message.embeds[0].fields;

      const modalTextInteraction = interaction as ModalSubmitInteraction;
      const feedback = modalTextInteraction.fields.getTextInputValue(
        "ignore_report_feedback_input"
      );

      this.updateEmbed(interaction, originalEmbedFields);
      this.sendMessage(interaction, originalEmbedFields, feedback);
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
  ): Promise<void> {
    const updateEmbed = new EmbedBuilder()
      .setColor(embedColors.redEmbedColor)
      .setTitle("Report Ignored")
      .addFields([
        {
          name: "Ignored by",
          value: `<@${interaction.user.id}>`,
          inline: false,
        },
      ])
      .setDescription(
        `
          **Sender:** ${originalEmbedFields[0]["value"]} 
          **Reported User:** ${originalEmbedFields[1]["value"]}
          **Reason:** ${originalEmbedFields[2]["value"]}
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
    feedback: string
  ): Promise<void> {
    const ignoreReportEmbed = new EmbedBuilder()
      .setColor(embedColors.redEmbedColor)
      .setTitle("Your report has been ignored")
      .addFields([
        {
          name: "feedback",
          value: feedback,
          inline: false,
        },
        {
          name: "Ignored by",
          value: `<@${interaction.user.id}>`,
          inline: false,
        },
      ])
      .setDescription(
        `
          **Reported User:** ${originalEmbedFields[1]["value"]}
          **Reason:** ${originalEmbedFields[2]["value"]}
        `
      );

    const senderId = originalEmbedFields[0].value.match(/[0-9]+/g)[0];
    const sender = await interaction.client.users.fetch(senderId);

    await sender.send({ embeds: [ignoreReportEmbed] });
  }
}

export { IgnoreReport };
