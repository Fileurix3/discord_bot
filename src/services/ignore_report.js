import { embedColors } from "../constants.js";
import {
  EmbedBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
} from "discord.js";

async function showIgnoredReportModal(interaction) {
  try {
    const modal = new ModalBuilder()
      .setCustomId("ignore_report_feedback_modal")
      .setTitle("Feedback on this report");

    const feedbackInput = new TextInputBuilder()
      .setCustomId("ignore_report_feedback_input")
      .setLabel("Your Feedback")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const row = new ActionRowBuilder().addComponents(feedbackInput);
    modal.addComponents(row);

    await interaction.showModal(modal);
  } catch (err) {
    await interaction.reply({
      content: "An error occurred: " + err.message,
      ephemeral: true,
    });
  }
}

async function ignoreReportServices(interaction) {
  try {
    const originalEmbedFields = interaction.message.embeds[0].fields;
    const feedback = interaction.fields.getTextInputValue(
      "ignore_report_feedback_input"
    );

    updateEmbed(interaction, originalEmbedFields);
    sendMessage(interaction, originalEmbedFields, feedback);
  } catch (err) {
    await interaction.reply({
      content: "An error occurred: " + err.message,
      ephemeral: true,
    });
  }
}

async function updateEmbed(interaction, originalEmbedFields) {
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

  await interaction.update({
    embeds: [updateEmbed],
    components: [],
  });
}

async function sendMessage(interaction, originalEmbedFields, feedback) {
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

export { showIgnoredReportModal, ignoreReportServices };
