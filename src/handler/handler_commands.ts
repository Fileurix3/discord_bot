import { embedColors, reportChannelId } from "../constants.js";
import { HandlerInteraction } from "./base_handler.js";
import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
  Interaction,
  TextChannel,
} from "discord.js";

export class HandlerCommands extends HandlerInteraction {
  async handler(interaction: Interaction): Promise<void> {
    try {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.commandName === "report") {
        const user = interaction.options.getUser("user", true);
        const reason = interaction.options.getString("reason", true);

        const reportEmbed = new EmbedBuilder()
          .setColor(embedColors.defaultEmbedColor)
          .setTitle("Report sent")
          .addFields(
            {
              name: "Sender",
              value: `<@${interaction.user.id}>`,
              inline: true,
            },
            { name: "Reported User", value: `<@${user.id}>`, inline: true },
            { name: "Reason", value: reason, inline: false }
          );

        await interaction.reply({ embeds: [reportEmbed], ephemeral: true });

        const newReportEmbed = new EmbedBuilder()
          .setColor(embedColors.defaultEmbedColor)
          .setTitle("New report")
          .addFields(
            {
              name: "Sender",
              value: `<@${interaction.user.id}>`,
              inline: true,
            },
            { name: "Reported User", value: `<@${user.id}>`, inline: true },
            { name: "Reason", value: reason, inline: false }
          );

        const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setCustomId("ignore_report")
            .setLabel("Ignore")
            .setStyle(ButtonStyle.Danger),
          new ButtonBuilder()
            .setCustomId("accept_report")
            .setLabel("Accept")
            .setStyle(ButtonStyle.Success)
        );

        const guild = interaction.guild;
        if (!guild) throw new Error("Guild not found");

        const channel = guild.channels.cache.get(
          reportChannelId
        ) as TextChannel;

        if (!channel) throw new Error("channel not found");
        await channel.send({
          embeds: [newReportEmbed],
          components: [actionRow],
        });
      } else {
        throw new Error("Unknown command");
      }
    } catch (err: unknown) {
      this.handlerError(interaction, err);
    }
  }
}
