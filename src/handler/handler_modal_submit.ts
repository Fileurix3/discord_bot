import { Interaction } from "discord.js";
import { AcceptReport } from "../services/reports/accept_report.js";
import { IgnoreReport } from "../services/reports/ignore_report.js";
import { HandlerInteraction } from "./base_handler.js";
import { QuestionReply } from "../services/questions/question_reply.js";

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
        } else if (interaction.customId === "question_reply_modal") {
          const questionReply = new QuestionReply();
          await questionReply.questionReplyServices(interaction);
        }
      }
    } catch (err: unknown) {
      await this.handlerError(interaction, err);
    }
  }
}
