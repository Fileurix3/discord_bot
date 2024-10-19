import { handlerError } from "../index.js";
import { showHelpPanel } from "../services/commands/help_panel_command.js";
import { HandlerInteraction } from "./base_handler.js";
import { Interaction } from "discord.js";

export class HandlerCommands extends HandlerInteraction {
  async handler(interaction: Interaction): Promise<void> {
    try {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.commandName === "help_panel") {
        showHelpPanel(interaction);
      } else {
        throw new Error("Unknown command");
      }
    } catch (err: unknown) {
      handlerError(interaction, err);
    }
  }
}
