import { showIgnoredReportModal } from "../services/ignore_report.js";
import { showAcceptReportSelectMenu } from "../services/accept_report.js";

export default async function handleButton(interaction) {
  try {
    if (interaction.isButton()) {
      if (interaction.customId === "ignore_report") {
        await showIgnoredReportModal(interaction);
      } else if (interaction.customId === "accept_report") {
        await showAcceptReportSelectMenu(interaction);
      }
    }
  } catch (err) {
    await interaction.reply({
      content: "An error occurred: " + err.message,
      ephemeral: true,
    });
  }
}
