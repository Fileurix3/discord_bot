import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Interaction,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { handlerError } from "../../index.js";
import { embedColors } from "../../constants.js";

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

  public async createNewTicketWithQuestion(
    interaction: Interaction
  ): Promise<void> {
    try {
      const modalTextInteraction = interaction as ModalSubmitInteraction;
      const question = modalTextInteraction.fields.getTextInputValue(
        "write_your_question_input"
      );

      const guild = interaction.guild;
      if (!guild) throw new Error("Guild not found");

      const moderRole = guild.roles.cache.find((role) => role.name === "Moder");

      if (!moderRole) throw new Error("Moder role not found");

      const moderMembers = guild.members.cache.filter(
        (member) =>
          member.roles.cache.has(moderRole.id) &&
          member.presence?.status === "online"
      );

      if (moderMembers.size === 0) {
        throw new Error("No Moderators found in the guild");
      }

      const randomModerId = (moderMembers as any).random().id;

      const ticketChannel = await guild.channels.create({
        name: `ticket-${interaction.user.username}`,
        type: 0,
        permissionOverwrites: [
          {
            id: guild.roles.everyone,
            deny: ["ViewChannel"],
          },
          {
            id: interaction.user.id,
            allow: ["ViewChannel", "SendMessages"],
          },
          {
            id: randomModerId,
            allow: ["ViewChannel", "SendMessages"],
          },
        ],
      });

      const ticketEmbed = new EmbedBuilder()
        .setColor(embedColors.mainEmbedColor)
        .setTitle("Your support ticket has been created")
        .setDescription(question);

      const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setLabel("Go to Ticket")
          .setStyle(ButtonStyle.Link)
          .setURL(
            `https://discord.com/channels/${guild.id}/${ticketChannel.id}`
          )
      );

      await ticketChannel.send(
        `Your question will soon be answered\n**will answer:** <@${randomModerId}>`
      );

      await (interaction as any).reply({
        embeds: [ticketEmbed],
        components: [actionRow],
        ephemeral: true,
      });
    } catch (err: unknown) {
      handlerError(interaction, err);
    }
  }
}

export { AskQuestion };
