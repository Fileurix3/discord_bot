import { Interaction } from "discord.js";

abstract class HandlerInteraction {
  async handler(interaction: Interaction): Promise<void> {}
}

export { HandlerInteraction };
