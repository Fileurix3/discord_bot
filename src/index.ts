import { Client, GatewayIntentBits, Interaction } from "discord.js";
import { handlerInteraction } from "./handler/handler_interaction.js";
import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

client.on("interactionCreate", handlerInteraction);

export async function handlerError(interaction: Interaction, err: unknown) {
  const errorMessage = err instanceof Error ? err.message : "Unknown error";
  await (interaction as any).reply({
    content: "An error occurred: " + errorMessage,
    ephemeral: true,
  });
}

client.on("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.login(process.env.TOKEN);
