import type { MessageTimestampStyle } from "@typings/index";

export { GatewayStatus, ShardEvents } from "@darkcord/ws";

export enum Events {
  // Gateway
  Packet = "packet",
  Ready = "ready",
  Reconnecting = "reconnecting",
  Connect = "connect",
  ShardConnect = "shardConnect",
  ShardDebug = "shardDebug",
  ShardClose = "shardClose",
  ShardResume = "shardResume",
  ShardReady = "shardReady",
  ShardReconnectRequired = "shardReconnectRequired",
  ShardPing = "shardPing",
  ShardHello = "shardHello",
  ShardPreReady = "shardPreReady",
  ShardError = "shardError",
  ShardDispatch = "shardDispatch",

  // Message
  MessageCreate = "messageCreate",
  MessageDelete = "messageDelete",
  MessageUpdate = "messageUpdate",
  MessageDeleteBulk = "messageDeleteBulk",
  MessageReactionAdd = "messageReactionAdd",
  MessageSuperReactionAdd = "messageSuperReactionAdd",
  MessageReactionRemove = "messageReactionRemove",
  MessageSuperReactionRemove = "messageSuperReactionRemove",
  MessageReactionRemoveAll = "messageReactionRemoveAll",
  MessageReactionRemoveEmoji = "messageReactionRemoveEmoji",
  TypingStart = "typingStart",

  // Interaction
  InteractionCreate = "interactionCreate",

  // Guild
  GuildMembersChunk = "guildMembersChunk",
  GuildMembersChunked = "guildMembersChunked",
  GuildCreate = "guildCreate",
  GuildUpdate = "guildUpdate",
  GuildDelete = "guildDelete",
  GuildAuditLogEntryCreate = "guildAuditLogEntryCreate",
  GuildBanAdd = "guildBanAdd",
  GuildBanRemove = "guildBanRemove",
  GuildEmojisUpdate = "guildEmojisUpdate",
  GuildEmojiCreate = "guildEmojiCreate",
  GuildEmojiDelete = "guildEmojiDelete",
  GuildEmojiUpdate = "guildEmojiUpdate",
  GuildStickersUpdate = "guildStickersUpdate",
  GuildStickerUpdate = "guildStickerUpdate",
  GuildStickerCreate = "guildStickerCreate",
  GuildStickerDelete = "guildStickerDelete",
  GuildMemberAdd = "guildMemberAdd",
  GuildMemberRemove = "guildMemberRemove",
  GuildMemberUpdate = "guildMemberUpdate",
  GuildIntegrationsUpdate = "guildIntegrationsUpdate",
  GuildRoleCreate = "guildRoleCreate",
  GuildRoleDelete = "guildRoleDelete",
  GuildRoleUpdate = "guildRoleUpdate",
  GuildScheduledEventCreate = "guildScheduledEventCreate",
  GuildScheduledEventDelete = "guildScheduledEventDelete",
  GuildScheduledEventUpdate = "guildScheduledEventUpdate",
  GuildScheduledEventUserAdd = "guildScheduledEventUserAdd",
  GuildScheduledEventUserRemove = "guildScheduledEventUserRemove",

  // Thread
  ThreadCreate = "threadCreate",
  ThreadDelete = "threadDelete",
  ThreadListSync = "threadListSync",
  ThreadMemberUpdate = "threadMemberUpdate",
  ThreadMembersUpdate = "threadMembersUpdate",

  // Stage
  StageInstanceCreate = "stageInstanceCreate",
  StageInstanceDelete = "stageInstanceDelete",
  StageInstanceUpdate = "stageInstanceUpdate",

  // Channels
  ChannelCreate = "channelCreate",
  ChannelDelete = "channelDelete",
  ChannelUpdate = "channelUpdate",
  ChannelPinsUpdate = "channelPinsUpdate",
  ChannelPinsAdd = "channelPinsAdd",
  ChannelPinsRemove = "channelPinsRemove",

  // User
  UserUpdate = "userUpdate",

  // Voice
  VoiceChannelSwitch = "voiceChannelSwitch",
  VoiceChannelLeave = "voiceChannelLeave",
  VoiceChannelJoin = "voiceChannelJoin",
  VoiceServerUpdate = "voiceServerUpdate",
  VoiceStateUpdate = "voiceStateUpdate",

  // Client
  Warn = "warn",
  Debug = "debug",

  // Integration
  IntegrationCreate = "integrationCreate",

  // Invite
  InviteCreate = "inviteCreate",
  InviteDelete = "inviteDelete",
}

export const InvitePattern =
  /discord(?:(?:app)?\.com\/invite|\.gg(?:\/invite)?)\/(?<code>[\w-]{2,255})/i;

export function timestampFormat<S extends MessageTimestampStyle>(
  time: number | string,
  style?: S,
): `<t:${string}:${S}>` | `<t:${string}>` {
  return `<t:${time}${style ? `:${style}` : ""}>`;
}

export function userMention(userId: string): `<@${string}>` {
  return `<@${userId}>`;
}

export function roleMention(roleId: string): `<@&${string}>` {
  return `<@&${roleId}>`;
}

export function channelMention(channelId: string): `<#${string}>` {
  return `<#${channelId}>`;
}

export {
  ActivityFlags,
  ApplicationFlags,
  ChannelFlags,
  GatewayIntentBits,
  GuildSystemChannelFlags,
  MessageFlags,
  PermissionFlagsBits,
  ThreadMemberFlags,
  UserFlags,
  ImageFormat,
  InteractionType,
  InviteTargetType,
  ChannelType,
  MessageType,
  StickerType,
  WebhookType,
  ActivityType,
  GuildHubType,
  ComponentType,
  OverwriteType,
  SortOrderType,
  ForumLayoutType,
  UserPremiumType,
  ApplicationCommandType,
  AllowedMentionsTypes,
  StickerFormatType,
  AuditLogOptionsType,
  MessageActivityType,
  InteractionResponseType,
  AutoModerationActionType,
  AutoModerationRuleEventType,
  ApplicationCommandOptionType,
  MembershipScreeningFieldType,
  AutoModerationRuleTriggerType,
  GuildScheduledEventEntityType,
  TextInputStyle,
  ApplicationCommandPermissionType,
  AutoModerationRuleKeywordPresetType,
  ApplicationRoleConnectionMetadataType,
  PresenceUpdateReceiveStatus,
  PresenceUpdateStatus,
  type APIAuditLogChangeKeyEventType,
  type TextChannelType,
  type GuildChannelType,
  type GuildTextChannelType,
  type AuditLogRuleTriggerType,
  type APIGuildIntegrationType,
  type APIAuditLogChangeKeyType,
  type APIActionRowComponentTypes,
  type APIAuditLogChangeKeyEntityType,
  type APIAuditLogChangeKeyFormatType,
  type RESTPostAPIChannelTypingResult,
  type APIAuditLogChangeKeyTriggerType,
  type RESTPutAPIGuildTemplateSyncResult,
} from "discord-api-types/v10";
