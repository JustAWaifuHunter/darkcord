import type Embed from '../structures/Embed'
import type { MessageOptions } from './Interfaces'

export type bit = string | number | bigint | object | any[];
export type image = { url: string; proxyURL?: string; height?: number; width?: number } | null;
export type thumbnail = { url: string; proxyURL?: string; height?: number; width?: number } | null;
export type video = { url: string; proxyURL?: string; height?: number; width?: number } | null;
export type author = { name: string; iconURL?: string; url?: string, proxyURL?: string } | null;
export type provider = { name: string; url?: string } | null;
export type footer = { text: string; iconURL?: string } | null;
export type EventNoResolvable = 'DEBUG' | 'READY' | 'MESSAGE_CREATE' | 'MESSAGE_REACTION_ADD' | 'MESSAGE_REACTION_REMOVE';
export type EventResolvable = 'ready' | 'message' | 'reaction' | 'reactionRemove';
export type IntentsType = 'GUILDS' | 'GUILD_MEMBERS' | 'GUILD_BANS' | 'GUILD_EMOJIS' | 'GUILD_INTEGRATIONS' | 'GUILD_WEBHOOKS' | 'GUILD_INVITES' | 'GUILD_VOICE_STATES' | 'GUILD_PRESENCES' | 'GUILD_MESSAGES' | 'GUILD_MESSAGE_REACTIONS' | 'GUILD_MESSAGE_TYPING' | 'DIRECT_MESSAGES' | 'DIRECT_MESSAGE_REACTIONS' | 'DIRECT_MESSAGE_TYPING';
export type ImageFormat = 'png' | 'jpeg' | 'jpg' | 'webp' | 'gif';
export type CacheTypes = 'channels' | 'users' | 'guilds' | 'emojis';
export type MessageContent = string | MessageOptions | Embed;
export type StyleTimestamp = 't' | 'T' | 'd' | 'D' | 'f *' | 'F' | 'R';

export enum ChannelType {
    TEXT = 0,
    DM = 1,
    VOICE = 2,
    GROUP = 3,
    CATEGORY = 4,
    NEWS = 5,
    STORE = 6,
    UNKNOWN = -1,
}

export enum ChannelTypeDef {
    TEXT = 'text',
    DM = 'dm',
    VOICE = 'voice',
    GROUP = 'group',
    CATEGORY = 'category',
    NEWS = 'news',
    STORE = 'store',
    UNKNOWN = 'unknown',
}
