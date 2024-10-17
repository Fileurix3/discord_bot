import { questionCommand } from "../services/commands/question_command.js";
import { reportCommand } from "../services/commands/report_commands.js";
import { HandlerInteraction } from "./base_handler.js";
import { Interaction } from "discord.js";

export class HandlerCommands extends HandlerInteraction {
  async handler(interaction: Interaction): Promise<void> {
    try {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.commandName === "report") {
        reportCommand(interaction);
      } else if (interaction.commandName === "question") {
        questionCommand(interaction);
      } else {
        throw new Error("Unknown command");
      }
    } catch (err: unknown) {
      this.handlerError(interaction, err);
    }
  }
}
