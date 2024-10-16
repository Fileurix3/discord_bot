import { Client, GatewayIntentBits } from "discord.js";
import { handlerInteraction } from "./handler/handler_interaction.js";
import handlerCommands from "./handler/handler_commands.js";
import "dotenv/config";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on("interactionCreate", (interaction) =>
  handlerCommands(interaction, client)
);
client.on("interactionCreate", handlerInteraction);

client.on("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.login(process.env.TOKEN);
