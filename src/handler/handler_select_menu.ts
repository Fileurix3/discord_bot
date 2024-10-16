import { Interaction } from "discord.js";
import { AcceptReport } from "../services/accept_report.js";
import { HandlerInteraction } from "./base_handler.js";

export class HandlerSelectMenu extends HandlerInteraction {
  async handler(interaction: Interaction): Promise<void> {
    try {
      if (interaction.isStringSelectMenu()) {
        if (interaction.customId === "report_choice") {
          const selectedValue = interaction.values[0];

          if (selectedValue === "send_warning_user") {
            const acceptReport = new AcceptReport();
            await acceptReport.showSendWarningUserModal(interaction);
          } else if (selectedValue === "ban_user") {
            console.log("ban");
          }
        }
      }
    } catch (err: unknown) {
      this.handlerError(interaction, err);
    }
  }
}
