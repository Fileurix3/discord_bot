import { Interaction } from "discord.js";

abstract class HandlerInteraction {
  async handler(interaction: Interaction): Promise<void> {}

  protected async handlerError(interaction: Interaction, error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    await (interaction as any).reply({
      content: "An error occurred: " + errorMessage,
      ephemeral: true,
    });
  }
}

export { HandlerInteraction };
