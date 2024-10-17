import { Interaction } from "discord.js";
import { HandlerButton } from "./handler_button.js";
import { HandlerModalSubmit } from "./handler_modal_submit.js";
import { HandlerSelectMenu } from "./handler_select_menu.js";
import { HandlerCommands } from "./handler_commands.js";

const handlerButton = new HandlerButton();
const handlerModalSubmit = new HandlerModalSubmit();
const handlerSelectMenu = new HandlerSelectMenu();
const handlerCommands = new HandlerCommands();

async function handlerInteraction(interaction: Interaction): Promise<void> {
  if (interaction.isButton()) {
    await handlerButton.handler(interaction);
  } else if (interaction.isModalSubmit()) {
    await handlerModalSubmit.handler(interaction);
  } else if (interaction.isStringSelectMenu()) {
    await handlerSelectMenu.handler(interaction);
  } else {
    await handlerCommands.handler(interaction);
  }
}

export { handlerInteraction };
