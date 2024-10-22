import {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  REST,
  Routes,
} from "discord.js";
import "dotenv/config";

const commands = [
  {
    name: "help_panel",
    description: "show help panel",
    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
  },
  {
    name: "close_ticket",
    description: "close ticket",
    default_member_permissions: PermissionFlagsBits.KickMembers.toString(),
  },
  {
    name: "rename_voice",
    description: "rename voice",
    options: [
      {
        name: "name",
        description: "name voice",
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
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
