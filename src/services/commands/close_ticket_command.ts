import { Interaction, TextChannel } from "discord.js";
import { handlerError } from "../../index.js";

export async function closeTicket(interaction: Interaction): Promise<void> {
  try {
    const ticketChanel = interaction.channel as TextChannel;

    if (ticketChanel.name.split("-")[0] !== "ticket") {
      throw new Error("You can't use this command on this channel");
    }

    await ticketChanel.delete();
  } catch (err: unknown) {
    handlerError(interaction, err);
  }
}
