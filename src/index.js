import { Client, GatewayIntentBits } from "discord.js";
import handleCommands from "./handler/handle_commands.js";
import handleButton from "./handler/handle_button.js";
import handleModalSubmit from "./handler/handle_modal_submit.js";
import handleSelectMenu from "./handler/hendle_select_menu.js";
import "dotenv/config";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.on("interactionCreate", (interaction) =>
  handleCommands(interaction, client)
);
client.on("interactionCreate", handleButton);
client.on("interactionCreate", handleModalSubmit);
client.on("interactionCreate", handleSelectMenu);

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);
