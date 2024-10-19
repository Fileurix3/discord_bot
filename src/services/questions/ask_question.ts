import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Interaction,
  ModalBuilder,
  ModalSubmitInteraction,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { handlerError } from "../../index.js";
import { embedColors, questionChannelId } from "../../constants.js";

class AskQuestion {
  public async showAskQuestionModal(interaction: Interaction): Promise<void> {
    try {
      const modal = new ModalBuilder()
        .setCustomId("write_question_modal")
        .setTitle("Write your question");

      const question = new TextInputBuilder()
        .setCustomId("write_your_question_input")
        .setLabel("Your question")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const row = new ActionRowBuilder<TextInputBuilder>().addComponents(
        question
      );
      modal.addComponents(row);

      await (interaction as any).showModal(modal);
    } catch (err: unknown) {
      handlerError(interaction, err);
    }
  }

  public async sendQuestion(interaction: Interaction): Promise<void> {
    try {
      const modalTextInteraction = interaction as ModalSubmitInteraction;
      const question = modalTextInteraction.fields.getTextInputValue(
        "write_your_question_input"
      );

      const guild = interaction.guild;
      if (!guild) throw new Error("Guild not found");

      const channel = guild.channels.cache.get(
        questionChannelId
      ) as TextChannel;

      if (!channel) throw new Error("channel not found");

      const newQuestionEmbed = new EmbedBuilder()
        .setColor(embedColors.mainEmbedColor)
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
        content: "Your question has been sent",
        ephemeral: true,
      });

      await channel.send({
        embeds: [newQuestionEmbed],
        components: [actionRow],
      });
    } catch (err: unknown) {
      handlerError(interaction, err);
    }
  }
}

export { AskQuestion };
