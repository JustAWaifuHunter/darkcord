import type Client from '../Client'
import type { API_Member, API_Role, API_User } from '../types/Interfaces'
import User from '../structures/User'
import Member from '../structures/Member'
import Role from '../structures/Role'
import Guild from '../structures/Guild'
import BaseChannel from '../structures/channels/BaseChannel'
import { ChannelType, ChannelTypeDef, EventNoResolvable } from '../types/Types'
import Message from '../structures/Message'
import TextChannel from '../structures/channels/TextChannel'
import { Events } from '../constants/Events'
import CacheManager from '../structures/cache/CacheManager'
import Emoji from '../structures/Emoji'
import Reaction from '../structures/Reaction'

class Resolve {
  private cache: CacheManager;
  constructor (
        private client: Client
  ) {
    this.cache = new CacheManager(this.client)
    return this
  }

  resolveUser (user: API_User) {
    return new User(
      user?.id,
      user?.username,
      user?.discriminator,
      user?.avatar,
      user?.bot,
      user?.system,
      user?.mfa_enabled,
      user?.locale,
      user?.verified,
      user?.flags,
      user?.premium_type,
      user?.public_flags
    )
  }

  resolveEmoji (emoji: any) {
    const {
      id,
      name,
      roles,
      user,
      require_colons,
      managed,
      animated,
      avaible
    } = emoji

    return new Emoji(
      id,
      name,
      roles,
      user,
      require_colons,
      managed,
      animated,
      avaible
    )
  }

  resolveMember (member: API_Member, guildId: string) {
    const user = this.resolveUser(member.user)

    const {
      nick,
      joined_at,
      premium_since,
      avatar,
      muted,
      deaf
    } = member

    return new Member(
      user.id,
      this.client,
      user,
      nick,
      joined_at,
      premium_since,
      deaf,
      muted,
      avatar,
      guildId
    )
  }

  resolveRole (role: API_Role) {
    return new Role(
      role.id,
      role.name,
      role.color,
      role.hoist,
      role.position,
      role.permissions,
      role.managed,
      role.mentionable
    )
  }

  resolveGuild (guild: any) {
    const {
      id,
      name,
      icon,
      description,
      splash,
      discovery_splash,
      features,
      approximate_member_count,
      approximate_presence_count,
      emojis,
      stickers,
      banner,
      owner_id,
      application_id,
      region,
      afk_channel_id,
      afk_timeout,
      system_channel_id,
      widget_enabled,
      widget_channel_id,
      verification_level,
      roles,
      embed_channel_id,
      system_channel_flags,
      max_presences,
      mfa_level,
      max_video_channel_users,
      vanity_url_code,
      embed_enabled,
      default_message_notifications,
      rules_channel_id,
      premium_subscription_count,
      max_members,
      premium_tier,
      public_updates_channel_id,
      preferred_locale,
      explicit_content_filter,
      nsfw_level
    } = guild

    const guildResolvable = new Guild(
      id,
      this.client,
      name,
      icon,
      description,
      splash,
      discovery_splash,
      features,
      banner,
      owner_id,
      region,
      application_id,
      afk_channel_id,
      afk_timeout,
      system_channel_id,
      widget_enabled,
      widget_channel_id,
      verification_level,
      default_message_notifications,
      mfa_level,
      explicit_content_filter,
      max_presences,
      max_members,
      max_video_channel_users,
      vanity_url_code,
      premium_tier,
      premium_subscription_count,
      system_channel_flags,
      preferred_locale,
      rules_channel_id,
      public_updates_channel_id,
      embed_enabled,
      embed_channel_id,
      stickers,
      nsfw_level,
      approximate_member_count,
      approximate_presence_count
    )

    guildResolvable.roles = roles
    guildResolvable.emojis = emojis

    return guildResolvable
  }

  async resolveTextChannel (channel: any) {
    const client = this.client
    const {
      id,
      type,
      name,
      last_message_id,
      last_pin_timestamp,
      position,
      parent_id,
      topic,
      guild_id,
      permission_overwrites,
      nsfw,
      rate_limit_per_user
    } = channel

    let guild: Guild | any = client.guilds.get(guild_id)

    if (!guild) {
      guild = await client.rest.fetch.guild(guild_id)
    }

    return new TextChannel(
      id,
      client,
      type,
      last_message_id,
      last_pin_timestamp,
      name,
      position,
      parent_id,
      topic,
      guild,
      permission_overwrites,
      nsfw,
      rate_limit_per_user
    )
  }

  async resolveReaction (reaction: any) {
    const {
      user_id,
      channel_id,
      message_id,
      guild_id
    } = reaction

    let user = this.client.users.get(user_id)
    let guild = this.client.guilds.get(guild_id)
    let channel = this.client.channels.get(channel_id)
    const emoji = this.resolveEmoji(reaction.emoji)

    let member
    if (reaction.member) {
      member = this.resolveMember(reaction.member, guild_id)
    }

    if (!user) {
      user = await this.client.rest.fetch.user(user_id)
      user = this.resolveUser(<any>user)
      this.cache.manage('users', user_id, user)
    }

    if (!guild) {
      guild = await this.client.rest.fetch.guild(guild_id)
      guild = this.resolveGuild(guild)
      this.cache.manage('guilds', guild_id, guild)
    }

    if (!channel) {
      channel = await this.client.rest.fetch.channel(channel_id)
      channel = await this.resolveTextChannel(channel)
      this.cache.manage('channels', channel_id, channel)
    }

    let message = await this.client.rest.fetch.message(channel_id, message_id)
    message = this.resolveMessage(message)

    return new Reaction(
      user,
      <TextChannel>
      channel,
      message,
      guild,
      emoji,
      member
    )
  }

  async resolveMessage (message: any) {
    const client = this.client
    const {
      channel_id,
      guild_id,
      author,
      embeds
    } = message

    let channel: BaseChannel | any = client.channels.get(channel_id)
    let guild: Guild | any = client.guilds.get(guild_id)
    let user: User | any = client.users.get(author?.id)
    let member = guild?.members?.get(author?.id)

    if (!channel) {
      channel = await client.rest.fetch.channel(channel_id)
    }

    const type: ChannelType = getChannelType(channel.type)
    if (type === ChannelType.DM) {
      return null
    }

    const typeDef: ChannelTypeDef = getChannelTypeDef(channel.type)

    if (typeDef === 'text') {
      channel = await this.resolveTextChannel(channel)
    }

    this.cache.manage('channels', channel.id, channel)

    if (!guild) {
      guild = await client.rest.fetch.guild(guild_id)
    }

    guild = this.resolveGuild(guild)

    this.cache.manage('guilds', guild.id, guild)

    if (!user) {
      user = await client.rest.fetch.user(author?.id)
    }

    user = this.resolveUser(user)

    this.cache.manage('users', user.id, user)

    if (!member) {
      member = await client.rest.fetch.member(guild_id, author?.id)
      member = this.resolveMember(member, guild_id)

      guild?.members?.set(member.user.id, member)
    }

    const resolvableMessage: Message = this.resolveMessageInstance(message, client, channel, guild, user, member)

    resolvableMessage.embeds = embeds
    return resolvableMessage
  }

  resolveMessageInstance (
    message: any,
    client: Client,
    channel: TextChannel,
    guild: Guild,
    user: User,
    member: Member | null
  ): Message {
    const { id, content, timestamp, edited_timestamp, tts, mention_everyone, nonce, pinned, type } = message
    return new Message(
      client,
      id,
      channel,
      guild,
      user,
      member,
      content,
      timestamp,
      edited_timestamp,
      tts,
      mention_everyone,
      nonce,
      pinned,
      type
    )
  }
}

export function getChannelType (type: number): ChannelType {
  if (type === 0) return ChannelType.TEXT
  if (type === 1) return ChannelType.DM
  if (type === 2) return ChannelType.VOICE
  if (type === 3) return ChannelType.DM
  if (type === 4) return ChannelType.CATEGORY
  if (type === 5) return ChannelType.NEWS
  if (type === 6) return ChannelType.STORE
  return ChannelType.UNKNOWN
}

export function getChannelTypeDef (type: number) {
  if (type === 0) return ChannelTypeDef.TEXT
  if (type === 1) return ChannelTypeDef.DM
  if (type === 2) return ChannelTypeDef.VOICE
  if (type === 3) return ChannelTypeDef.DM
  if (type === 4) return ChannelTypeDef.CATEGORY
  if (type === 5) return ChannelTypeDef.NEWS
  if (type === 6) return ChannelTypeDef.STORE
  return ChannelTypeDef.UNKNOWN
}

export function resolveEvents (event: string): Events {
  const ev = <EventNoResolvable>event
  return Events[ev]
}

export default Resolve
