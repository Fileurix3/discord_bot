import { Client, GatewayIntentBits, Interaction } from "discord.js";
import { handlerInteraction } from "./handler/handler_interaction.js";
import { temporaryVoiceChannel } from "./services/temporary_voice_channel.js";
import "dotenv/config";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.on("interactionCreate", handlerInteraction);
client.on("voiceStateUpdate", temporaryVoiceChannel);

export async function handlerError(interaction: Interaction, err: unknown) {
  const errorMessage = err instanceof Error ? err.message : "Unknown error";
  await (interaction as any).reply({
    content: errorMessage,
    ephemeral: true,
  });
}

client.on("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.login(process.env.TOKEN);
