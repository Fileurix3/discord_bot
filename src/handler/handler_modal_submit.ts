import { Interaction } from "discord.js";
import { HandlerInteraction } from "./base_handler.js";
import { QuestionReply } from "../services/questions/question_reply.js";
import { handlerError } from "../index.js";
import { AskQuestion } from "../services/questions/ask_question.js";
import { SendReportProblem } from "../services/report problem/send_report_problem.js";
import { ReplyReportProblem } from "../services/report problem/reply_report_problem.js";

export class HandlerModalSubmit extends HandlerInteraction {
  async handler(interaction: Interaction): Promise<void> {
    try {
      if (interaction.isModalSubmit()) {
        if (interaction.customId === "question_reply_modal") {
          const questionReply = new QuestionReply();
          await questionReply.questionReplyServices(interaction);
        } else if (interaction.customId === "write_question_modal") {
          const askQuestion = new AskQuestion();
          await askQuestion.sendQuestion(interaction);
        } else if (interaction.customId === "report_problem_modal") {
          const sendReportProblem = new SendReportProblem();
          await sendReportProblem.sendReportProblem(interaction);
        } else if (interaction.customId === "reply_report_problem_modal") {
          const replyReportProblem = new ReplyReportProblem();
          await replyReportProblem.replyReportProblem(interaction);
        }
      }
    } catch (err: unknown) {
      handlerError(interaction, err);
    }
  }
}
