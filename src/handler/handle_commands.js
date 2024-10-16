import { embedColors, reportChannelId } from "../constants.js";
import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
} from "discord.js";

export default async function handleCommands(interaction, client) {
  try {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "report") {
      const user = interaction.options.getUser("user");
      const reason = interaction.options.getString("reason");

      const reportEmbed = new EmbedBuilder()
        .setColor(embedColors.defaultEmbedColor)
        .setTitle("Report sent")
        .addFields(
          { name: "Sender", value: `<@${interaction.user.id}>`, inline: true },
          { name: "Reported User", value: `<@${user.id}>`, inline: true },
          { name: "Reason", value: reason, inline: false }
        );

      await interaction.reply({ embeds: [reportEmbed] });

      const channel = await client.channels.fetch(reportChannelId);

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

      const actionRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("ignore_report")
          .setLabel("Ignore")
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId("accept_report")
          .setLabel("Accept")
          .setStyle(ButtonStyle.Success)
      );

      await channel.send({
        embeds: [newReportEmbed],
        components: [actionRow],
      });
    } else {
      throw new Error("channel not found");
    }
  } catch (err) {
    await interaction.reply({
      content: "An error occurred: " + err.message,
      ephemeral: true,
    });
  }
}
