import { Interaction } from "discord.js";
import { AcceptReport } from "../services/reports/accept_report.js";
import { IgnoreReport } from "../services/reports/ignore_report.js";
import { HandlerInteraction } from "./base_handler.js";
import { QuestionReply } from "../services/questions/question_reply.js";

export class HandlerButton extends HandlerInteraction {
  async handler(interaction: Interaction): Promise<void> {
    try {
      if (interaction.isButton()) {
        if (interaction.customId === "ignore_report") {
          const ignoreReport = new IgnoreReport();
          await ignoreReport.showIgnoredReportModal(interaction);
        } else if (interaction.customId === "accept_report") {
          const acceptReport = new AcceptReport();
          await acceptReport.showAcceptReportSelectMenu(interaction);
        } else if (interaction.customId === "question_reply") {
          const questionReply = new QuestionReply();
          await questionReply.showQuestionReplyModal(interaction);
        }
      }
    } catch (err: unknown) {
      this.handlerError(interaction, err);
    }
  }
}
