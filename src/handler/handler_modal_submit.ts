import { Interaction } from "discord.js";
import { HandlerInteraction } from "./base_handler.js";
import { handlerError } from "../index.js";
import { AskQuestion } from "../services/questions/question_ticket.js";

export class HandlerModalSubmit extends HandlerInteraction {
  async handler(interaction: Interaction): Promise<void> {
    try {
      if (interaction.isModalSubmit()) {
        if (interaction.customId === "write_question_modal") {
          const askQuestion = new AskQuestion();
          await askQuestion.createNewTicketWithQuestion(interaction);
        }
      }
    } catch (err: unknown) {
      handlerError(interaction, err);
    }
  }
}
