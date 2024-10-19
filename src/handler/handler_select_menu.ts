import { Interaction } from "discord.js";
import { HandlerInteraction } from "./base_handler.js";
import { handlerError } from "../index.js";

export class HandlerSelectMenu extends HandlerInteraction {
  async handler(interaction: Interaction): Promise<void> {
    try {
      if (interaction.isStringSelectMenu()) {
      }
    } catch (err: unknown) {
      handlerError(interaction, err);
    }
  }
}
