import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Interaction,
} from "discord.js";
import { handlerError } from "../../index.js";
import { embedColors } from "../../constants.js";

export async function showHelpPanel(interaction: Interaction): Promise<void> {
  try {
    const helpPanelEmbed = new EmbedBuilder()
      .setColor(embedColors.mainEmbedColor)
      .setTitle("Help panel")
      .setDescription(
        "If you want to ask a question to the moderators of the server\n" +
          "**please use this panel**"
      )
      .addFields();

    const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("ask_question")
        .setLabel("Ask a question")
        .setStyle(ButtonStyle.Success)
    );

    await (interaction as any).reply({
      embeds: [helpPanelEmbed],
      components: [actionRow],
    });
  } catch (err) {
    handlerError(interaction, err);
  }
}
