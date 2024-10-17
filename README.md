# Discord_bot

## About

Discord bot for the convenience of users on the server

## What does the bot do?

- `/report <user> <reason>`:

  When entering this command into a separate `reports` channel, a message from the bot comes in which there are fields:

  - `sender`: Who sent the report.
  - `report user`: The user who was the subject of the report.
  - `reason`: Reason for report.

  This message has two buttons:

  - `Ignore`: When you click `Ignore` button, the user who sent the report receives a message that his report has been ignored.
  - `Accept`: When you click the `Accept` button you will have to choose what kind of punishment to give to the user “Warning, etc” and then the user will receive a message about the punishment.

- `/question <question>`:

  When entering this command into a separate `questions` channel, a message from the bot comes in which there are fields:

  - `Question`: The question sent by the user.

  - `Asked a question`: User who submitted a question.

  This message has one buttons:

  - `Reply`: When clicking the `Reply` button, the user who sent the question receives a message from the bot with the answer to this question and the name of the person who answered the question

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
