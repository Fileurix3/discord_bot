import {
  CommandInteraction,
  GuildMember,
  Interaction,
  PermissionsBitField,
} from "discord.js";
import { handlerError } from "../../index.js";
import { prefixChannel } from "../../constants.js";

export async function renameVoice(interaction: Interaction): Promise<void> {
  try {
    const guildMember = interaction.member as GuildMember;
    if (!guildMember.voice.channel) {
      throw new Error("You must be in a voice channel");
    }

    const voiceChannel = guildMember.voice.channel;
    if (
      voiceChannel
        .permissionsFor(guildMember)
        .has(PermissionsBitField.Flags.ManageChannels)
    ) {
      const commandInteraction = interaction as CommandInteraction;
      const newVoiceName = commandInteraction.options.get("name", true)[
        "value"
      ];

      await guildMember.voice.channel.setName(
        `${prefixChannel}${newVoiceName}`
      );

      await commandInteraction.reply("channel rename successfully");
    } else {
      throw new Error("you don't have enough rights");
    }
  } catch (err: unknown) {
    handlerError(interaction, err);
  }
}
