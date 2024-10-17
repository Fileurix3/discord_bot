import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Interaction,
  TextChannel,
} from "discord.js";
import { embedColors, questionChannelId } from "../../constants.js";

export async function questionCommand(interaction: Interaction) {
  const chatInputCommand = interaction as ChatInputCommandInteraction;

  const question = chatInputCommand.options.getString("question", true);

  const guild = interaction.guild;
  if (!guild) throw new Error("Guild not found");

  const channel = guild.channels.cache.get(questionChannelId) as TextChannel;

  if (!channel) throw new Error("channel not found");

  const questionEmbed = new EmbedBuilder()
    .setColor(embedColors.defaultEmbedColor)
    .setTitle("Question sent")
    .setDescription("Your question will be answered shortly")
    .addFields({
      name: `Yout question`,
      value: question,
      inline: true,
    });

  const newQuestionEmbed = new EmbedBuilder()
    .setColor(embedColors.defaultEmbedColor)
    .setTitle("New question")
    .addFields(
      {
        name: `Question`,
        value: question,
        inline: false,
      },
      {
        name: "Asked a question",
        value: `<@${interaction.user.id}>`,
        inline: true,
      }
    );

  const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId("question_reply")
      .setLabel("Reply")
      .setStyle(ButtonStyle.Success)
  );

  await (interaction as any).reply({
    embeds: [questionEmbed],
    ephemeral: true,
  });

  await channel.send({ embeds: [newQuestionEmbed], components: [actionRow] });
}
