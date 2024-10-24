# Discord_bot

## About

Discord bot for the convenience of users on the server

## What does the bot do?

- `/help_panel`:

  This command can only be entered by the administrator (preferably entered in a channel where users cannot write).

  after entering the command, embed with `Ask a question` button appears

  - `Ask a question`: By clicking on this button, the user can ask a question, a new text channel will be created for the question asked, which will be visible only to the person who asked the question and to one of the moderators who is chosen at random based on the parameters: **«he is online and has a role called `Moder`»**.

    A moderator can close this text feed by answering a user's question using the command: `/close_ticket`.

- `Creating a temporary voice channel`:

  When a user logs into a particular channel, the bot will create a new temporary channel named `!<Username>channel`. The bot will move the user into it and send instructions to the text channel on how the user can configure that channel.

  If there are no people in that voice channel, the bot will delete the channel.

## dependencies

- **discord.js** ([npm](https://www.npmjs.com/package/discord.js?activeTab=readme))

  - to work with the discrod api

- **dotenv** ([npm](https://www.npmjs.com/package/dotenv))

  - to load environment variables from a `.env` file

- **nodemon** ([npm](https://www.npmjs.com/package/nodemon))

  - utility for automatically restarting the Node.js application on file changes

- **typescript** ([npm](https://www.npmjs.com/package/typescript))

  - adding typing for javascript

- **@types/node** ([npm](https://www.npmjs.com/package/@types/node))

  - adding typing for nodejs
