import { embedColors } from "../constants.js";
import {
  EmbedBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
} from "discord.js";

let originalEmbed;

async function showAcceptReportSelectMenu(interaction) {
  try {
    originalEmbed = interaction.message;

    const selectMenu = {
      type: 1,
      components: [
        {
          type: 3,
          custom_id: "report_choice",
          placeholder: "Choose an option...",
          options: [
            {
              label: "Send a warning to the user",
              value: "send_warning_user",
            },
            {
              label: "Ban the user",
              value: "ban_user",
            },
          ],
        },
      ],
    };

    await interaction.reply({
      content: "Choose an option:",
      components: [selectMenu],
      ephemeral: true,
    });
  } catch (err) {
    await interaction.reply({
      content: "An error occurred: " + err.message,
      ephemeral: true,
    });
  }
}

async function showSendWarningUserModal(interaction) {
  try {
    const modal = new ModalBuilder()
      .setCustomId("send_warning_user_modal")
      .setTitle("Send warning to user");

    const warningInput = new TextInputBuilder()
      .setCustomId("send_warning_user_input")
      .setLabel("Warning")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const row = new ActionRowBuilder().addComponents(warningInput);
    modal.addComponents(row);

    await interaction.showModal(modal);
  } catch (err) {
    await interaction.reply({
      content: "An error occurred: " + err.message,
      ephemeral: true,
    });
  }
}

async function sendWarningToUser(interaction) {
  try {
    const infringementWarning = interaction.fields.getTextInputValue(
      "send_warning_user_input"
    );

    const senderId =
      originalEmbed.embeds[0].fields[0].value.match(/[0-9]+/g)[0];
    const reportUserId =
      originalEmbed.embeds[0].fields[1].value.match(/[0-9]+/g)[0];

    const sender = await interaction.client.users.fetch(senderId);
    const reportUser = await interaction.client.users.fetch(reportUserId);

    const notifyingUserReportReviewed = new EmbedBuilder()
      .setColor(embedColors.reportProcessedEmbedColor)
      .setTitle("Report accepted")
      .setDescription("User has been sent an infringement warning")
      .addFields([{ name: "Report user", value: reportUser.tag }]);

    const sendInfringementWarningEmbed = new EmbedBuilder()
      .setColor(embedColors.redEmbedColor)
      .setTitle("You have been sent an infraction warning")
      .setDescription(infringementWarning);

    const updateOriginalEmbed = new EmbedBuilder()
      .setColor(embedColors.reportProcessedEmbedColor)
      .setTitle("Report Processed")
      .setDescription(
        "The report has been processed and a warning has been sent"
      )
      .addFields([
        { name: "Reported User", value: `<@${reportUser.id}>` },
        { name: "Warning Message", value: infringementWarning },
      ]);

    await originalEmbed.edit({ embeds: [updateOriginalEmbed], components: [] });

    await sender.send({ embeds: [notifyingUserReportReviewed] });
    await reportUser.send({ embeds: [sendInfringementWarningEmbed] });

    await interaction.reply({
      content: "Warning sent successfully",
      ephemeral: true,
    });
  } catch (err) {
    await interaction.reply({
      content: "An error occurred: " + err.message,
      ephemeral: true,
    });
  }
}

export {
  showAcceptReportSelectMenu,
  showSendWarningUserModal,
  sendWarningToUser,
};
