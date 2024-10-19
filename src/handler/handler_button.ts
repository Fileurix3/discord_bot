import { Interaction } from "discord.js";
import { HandlerInteraction } from "./base_handler.js";
import { QuestionReply } from "../services/questions/question_reply.js";
import { handlerError } from "../index.js";
import { AskQuestion } from "../services/questions/ask_question.js";
import { SendReportProblem } from "../services/report problem/send_report_problem.js";
import { ReplyReportProblem } from "../services/report problem/reply_report_problem.js";

export class HandlerButton extends HandlerInteraction {
  async handler(interaction: Interaction): Promise<void> {
    try {
      if (interaction.isButton()) {
        if (interaction.customId === "ask_question") {
          const askQuestion = new AskQuestion();
          await askQuestion.showAskQuestionModal(interaction);
        } else if (interaction.customId === "question_reply") {
          const questionReply = new QuestionReply();
          await questionReply.showQuestionReplyModal(interaction);
        } else if (interaction.customId === "report_problem") {
          const sendReportProblem = new SendReportProblem();
          await sendReportProblem.showReportProblemModal(interaction);
        } else if (interaction.customId === "report_problem_reply") {
          const replyReportProblem = new ReplyReportProblem();
          await replyReportProblem.showReplyReportProblemModal(interaction);
        }
      }
    } catch (err: unknown) {
      handlerError(interaction, err);
    }
  }
}
