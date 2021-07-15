import { StyleTimestamp } from '../types/Types'

const DFormats: {
  /** Creates timestamp */
  createTimestamp: (time: number) => string;
  /** Creates styled timestamp */
  createStyledTimestamp: (time: number, style: StyleTimestamp) => string;
  /** Creates user mention */
  createUserMention: (userId: string) => string;
  /** Creates role mention */
  createRoleMention: (roleId: string) => string;
  /** Creates channel mention */
  createChannelMention: (channelId: string) => string;
  /** Creates emoji code */
  createEmojiCode: (emojiName: string, emojiId: string) => string;
  /** Creates animated emoji code */
  createAnimatedEmojiCode: (emojiName: string, emojiId: string) => string;
} = {
  createTimestamp: (time: number) => {
    return `<t:${time}>`
  },
  createStyledTimestamp: (time: number, style: StyleTimestamp = 't') => {
    return `<t:${time}:${style}>`
  },
  createUserMention: (userId: string) => {
    return `<@${userId}>`
  },
  createRoleMention: (roleId: string) => {
    return `<@&${roleId}>`
  },
  createChannelMention: (channelId: string) => {
    return `<@#${channelId}>`
  },
  createEmojiCode: (emojiName: string, emojiId: string) => {
    return `<:${emojiName}:${emojiId}>`
  },
  createAnimatedEmojiCode: (emojiName: string, emojiId: string) => {
    return `<a:${emojiName}:${emojiId}>`
  }
}

export default DFormats
