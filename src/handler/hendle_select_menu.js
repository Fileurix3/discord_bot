import { showSendWarningUserModal } from "../services/accept_report.js";

export default async function handleSelectMenu(interaction) {
  try {
    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === "report_choice") {
        const selectedValue = interaction.values[0];

        if (selectedValue === "send_warning_user") {
          await showSendWarningUserModal(interaction);
        } else if (selectedValue === "ban_user") {
          console.log("ban");
        }
      }
    }
  } catch (err) {
    await interaction.reply({
      content: "An error occurred: " + err.message,
      ephemeral: true,
    });
  }
}
