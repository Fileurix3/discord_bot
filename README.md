# Discord_bot

## About

Discord bot for sending messages about user violations

## What does the bot do?

- `/report <user> <reason>`:

  When entering this command into a separate `reports` channel, a message from the bot comes in which there are fields:

  - `sender`: Who sent the report.
  - `report user`: The user who was the subject of the report.
  - `reason`: Reason for report.

  This message has two buttons:

  - `Ignore`: When you click ignore button, the user who sent the report receives a message that his report has been ignored.
  - `Accept`: When you click the “Accept” button you will have to choose what kind of punishment to give to the user “Warning, etc” and then the user will receive a message about the punishment.

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
