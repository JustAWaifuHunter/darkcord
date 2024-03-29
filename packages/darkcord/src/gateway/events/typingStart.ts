import { TextBasedChannel } from "@resources/Channel";
import { Guild } from "@resources/Guild";
import { Member } from "@resources/Member";
import { Events } from "@utils/Constants";
import { GatewayTypingStartDispatchData } from "discord-api-types/v10";
import { Event } from "./Event";

export class TypingStart extends Event {
  run(data: GatewayTypingStartDispatchData) {
    let guild: Guild | null | undefined, member: Member | null | undefined;

    if (data.guild_id) {
      guild = this.getGuild(data.guild_id);
      member = guild?.members.cache.get(data.user_id);
    }

    const startedTimestamp = data.timestamp;
    const channelId = data.channel_id;
    const guildId = data.guild_id;
    const userId = data.user_id;
    const channel = this.client.channels.cache.get(
      channelId,
    ) as TextBasedChannel;

    this.client.emit(Events.TypingStart, {
      channelId,
      channel,
      startedTimestamp,
      guild,
      member,
      guildId,
      userId,
    });
  }
}
