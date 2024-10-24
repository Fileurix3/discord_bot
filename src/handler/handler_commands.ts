import { handlerError } from "../index.js";
import { closeTicket } from "../services/commands/close_ticket_command.js";
import { showHelpPanel } from "../services/commands/help_panel_command.js";
import { renameVoice } from "../services/commands/rename_voice_command.js";
import { HandlerInteraction } from "./base_handler.js";
import { Interaction } from "discord.js";

export class HandlerCommands extends HandlerInteraction {
  async handler(interaction: Interaction): Promise<void> {
    try {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.commandName === "help_panel") {
        showHelpPanel(interaction);
      } else if (interaction.commandName === "close_ticket") {
        closeTicket(interaction);
      } else if (interaction.commandName === "rename_voice") {
        renameVoice(interaction);
      } else {
        throw new Error("Unknown command");
      }
    } catch (err: unknown) {
      handlerError(interaction, err);
    }
  }
}
