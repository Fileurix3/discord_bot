# Discord_bot

## About

Discord bot for the convenience of users on the server

## What does the bot do?

- `/help_panel`:
  This command can only be entered by the administrator (preferably entered in a channel where users cannot write).

  when entering this command, embed appears with several buttons:

  - `Ask a question`: By clicking this button, the user can ask a question to the moderators of the server, this question will be sent to a separate channel for moderators, and after answering this question the user will receive an answer from the bot in a private message.

    **for example:** (when a new voice channel will be available)

  - `Report a problem`: Clicking on this button performs the same action as clicking on the `Ask a question` button, but now the user will be able to report a problem.

    **for example:** (I can't see the N text channel)

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
