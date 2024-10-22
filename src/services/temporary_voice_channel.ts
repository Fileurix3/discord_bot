import {
  ChannelType,
  EmbedBuilder,
  PermissionsBitField,
  VoiceState,
} from "discord.js";
import { embedColors, prefixChannel, targetChannelId } from "../constants.js";

export async function temporaryVoiceChannel(
  oldState: VoiceState,
  newState: VoiceState
) {
  if (newState.channelId === targetChannelId) {
    const guild = newState.guild;

    const newVoice = await guild.channels.create({
      name: `${prefixChannel}${
        newState.member?.displayName ?? "Unknown"
      } channel`,
      type: ChannelType.GuildVoice,
      permissionOverwrites: [
        {
          id: newState.member!.id,
          allow: [PermissionsBitField.Flags.ManageChannels],
        },
      ],
    });

    const embed = new EmbedBuilder()
      .setColor(embedColors.mainEmbedColor)
      .setTitle("Voice channel has been successfully established")
      .setDescription("Use these commands to configure this channel:")
      .addFields([
        {
          name: `/rename_voice <name>`,
          value: "to rename this channel",
          inline: false,
        },
      ]);

    await newState.member?.voice.setChannel(newVoice);
    await newVoice.send({ embeds: [embed] });
  }

  if (
    oldState.channel &&
    oldState.channel.name.startsWith(prefixChannel) &&
    oldState.channel.members.size === 0
  ) {
    await oldState.channel.delete();
  }
}
