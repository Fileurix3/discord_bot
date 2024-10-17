import { REST, Routes } from "discord.js";
import "dotenv/config";

const commands = [
  {
    name: "report",
    description: "Report a user",
    options: [
      {
        name: "user",
        type: 6,
        description: "The user to report",
        required: true,
      },
      {
        name: "reason",
        type: 3,
        description: "Reason for the report",
        required: true,
      },
    ],
  },
  {
    name: "question",
    description: "Question the moderators",
    options: [
      {
        name: "question",
        type: 3,
        description: "Your question",
        required: true,
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
