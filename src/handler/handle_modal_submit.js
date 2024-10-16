import { sendWarningToUser } from "../services/accept_report.js";
import { ignoreReport } from "../services/ignore_report.js";

export default async function handleModalSubmit(interaction) {
  try {
    if (interaction.isModalSubmit()) {
      if (interaction.customId === "ignore_report_feedback_modal") {
        await ignoreReport(interaction);
      } else if (interaction.customId === "send_warning_user_modal") {
        await sendWarningToUser(interaction);
      }
    }
  } catch (err) {
    await interaction.reply({
      content: "An error occurred: " + err.message,
      ephemeral: true,
    });
  }
}
