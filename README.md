# Discord_bot

## About

Discord bot for the convenience of users on the server

## What does the bot do?

- `/help_panel`:
  This command can only be entered by the administrator (preferably entered in a channel where users cannot write).

  when entering this command, embed appears with several buttons:

  - `Ask a question`: By clicking on this button, the user can ask a question on the asked question a new text channel will be created which will be seen only by the one who asked this question and one of the moderators.

    A moderator can close this text feed by answering a user's question using the command: `/close_ticket`.

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
