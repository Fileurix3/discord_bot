import { Interaction } from "discord.js";
import { AcceptReport } from "../services/accept_report.js";
import { IgnoreReport } from "../services/ignore_report.js";
import { HandlerInteraction } from "./base_handler.js";

export class HandlerModalSubmit extends HandlerInteraction {
  async handler(interaction: Interaction): Promise<void> {
    try {
      if (interaction.isModalSubmit()) {
        if (interaction.customId === "ignore_report_feedback_modal") {
          const ignoreReport = new IgnoreReport();
          await ignoreReport.ignoreReportServices(interaction);
        } else if (interaction.customId === "send_warning_user_modal") {
          const acceptReport = new AcceptReport();
          await acceptReport.sendWarningToUser(interaction);
        }
      }
    } catch (err: unknown) {
      await this.handlerError(interaction, err);
    }
  }
}
