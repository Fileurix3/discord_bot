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

class SendReportProblem {
  public async showReportProblemModal(interaction: Interaction): Promise<void> {
    try {
      const modal = new ModalBuilder()
        .setCustomId("report_problem_modal")
        .setTitle("What problem you're facing");

      const problem = new TextInputBuilder()
        .setCustomId("report_problem_input")
        .setLabel("What's your problem?")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const row = new ActionRowBuilder<TextInputBuilder>().addComponents(
        problem
      );

      modal.addComponents(row);
      await (interaction as any).showModal(modal);
    } catch (err: unknown) {
      handlerError(interaction, err);
    }
  }

  public async sendReportProblem(interaction: Interaction): Promise<void> {
    try {
      const modalTextInteraction = interaction as ModalSubmitInteraction;
      const problem = modalTextInteraction.fields.getTextInputValue(
        "report_problem_input"
      );

      const guild = interaction.guild;
      if (!guild) throw new Error("Guild not found");

      const channel = guild.channels.cache.get(
        questionChannelId
      ) as TextChannel;

      if (!channel) throw new Error("channel not found");

      const reportProblemEmbed = new EmbedBuilder()
        .setColor(embedColors.redEmbedColor)
        .setTitle("New problem")
        .addFields(
          {
            name: `Problem`,
            value: problem,
            inline: false,
          },
          {
            name: "Sender",
            value: `<@${interaction.user.id}>`,
            inline: true,
          }
        );

      const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId("report_problem_reply")
          .setLabel("Reply")
          .setStyle(ButtonStyle.Danger)
      );

      await (interaction as any).reply({
        content: "Your problem has been sent and will be dealt with shortly.",
        ephemeral: true,
      });

      await channel.send({
        embeds: [reportProblemEmbed],
        components: [actionRow],
      });
    } catch (err: unknown) {
      handlerError(interaction, err);
    }
  }
}
export { SendReportProblem };
