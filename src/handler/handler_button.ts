import { Interaction } from "discord.js";
import { HandlerInteraction } from "./base_handler.js";
import { handlerError } from "../index.js";
import { AskQuestion } from "../services/questions/question_ticket.js";

export class HandlerButton extends HandlerInteraction {
  async handler(interaction: Interaction): Promise<void> {
    try {
      if (interaction.isButton()) {
        if (interaction.customId === "ask_question") {
          const askQuestion = new AskQuestion();
          await askQuestion.showAskQuestionModal(interaction);
        }
      }
    } catch (err: unknown) {
      handlerError(interaction, err);
    }
  }
}
