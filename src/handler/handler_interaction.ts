import { Interaction } from "discord.js";
import { HandlerButton } from "./handler_button.js";
import { HandlerModalSubmit } from "./handler_modal_submit.js";
import { HandlerSelectMenu } from "./handler_select_menu.js";

const handlerButton = new HandlerButton();
const handlerModalSubmit = new HandlerModalSubmit();
const handlerSelectMenu = new HandlerSelectMenu();

async function handlerInteraction(interaction: Interaction): Promise<void> {
  if (interaction.isButton()) {
    await handlerButton.handler(interaction);
  } else if (interaction.isModalSubmit()) {
    await handlerModalSubmit.handler(interaction);
  } else if (interaction.isStringSelectMenu()) {
    await handlerSelectMenu.handler(interaction);
  }
}

export { handlerInteraction };
