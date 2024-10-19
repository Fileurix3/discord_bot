import { PermissionFlagsBits, REST, Routes } from "discord.js";
import "dotenv/config";

const commands = [
  {
    name: "help_panel",
    description: "show help panel",
    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN as string);

(async () => {
  try {
    console.log("Started refreshing application (/) commands");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID as string),
      {
        body: commands,
      }
    );

    console.log("Successfully reloaded application (/) commands");
  } catch (error) {
    console.error(error);
  }
})();
