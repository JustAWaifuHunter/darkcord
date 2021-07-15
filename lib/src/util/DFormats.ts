const DFormats: Record<string, Function> = {}

/** Creates timestamp */
DFormats.createTimestamp = (time: number) => {
  return `<t:${time}>`
}

/** Creates user mention */
DFormats.createUserMention = (userId: string) => {
  return `<@!${userId}>`
}

/** Creates role mention */
DFormats.createRoleMention = (roleId: string) => {
  return `@&${roleId}`
}

export default DFormats
