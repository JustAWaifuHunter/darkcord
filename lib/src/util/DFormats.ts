const DFormats: {
  /** Creates timestamp */
  createTimestamp: (time: number) => string;
  /** Creates user mention */
  createUserMention: (userId: string) => string;
  /** Creates role mention */
  createRoleMention: (roleId: string) => string
} = {
  createTimestamp: (time: number) => {
    return `<t:${time}>`
  },
  createUserMention: (userId: string) => {
    return `<@!${userId}>`
  },
  createRoleMention: (roleId: string) => {
    return `@&${roleId}`
  }
}

export default DFormats
