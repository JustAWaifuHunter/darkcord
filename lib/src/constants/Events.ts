export enum Events {
    DEBUG = 'debug',
    READY = 'ready',
    MESSAGE_CREATE = 'message',
    UPDATE_MESSAGE = 'messageUpdate',
    MESSAGE_REACTION_ADD = 'reaction',
    MESSAGE_REACTION_REMOVE = 'reactionRemove',
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    SHARD_READY = 'shardReady',
    GUILD_CREATE = 'guildCreate',
    GUILD_DELETE = 'guildDelete',
    GUILD_UPDATE = 'guildUpdate',
    GUILD_BAN_ADD = 'guildBan',
    GUILD_BAN_REMOVE = 'guildBanRemove'
}
