export enum Constants {
    gateway = 'wss://gateway.discord.gg/?v=9&encoding=etf',
    API = 'https://discord.com/api/v9',
}

export enum EndPoints {
    users = 'users',
    user_guilds = 'users/@me/guilds',
    guilds = 'guilds',
    channels = 'channels',
    messages = 'messages',
    members = 'members',
    reactions = 'reactions',
    pins = 'pins',
}

export enum StatusCode {
    ok = 200,
    no_content = 204,
    create = 201,
    bad = 400,
    not_found = 404
}

export enum Regex {
    emoji_with_colon = ':\\w+:\\d+',
    group_emoji_id = '^:\\w+:(\\d+)$',
    emoji_id_only = '^\\d+$',
    group_emoji_name = '^:(\\w+):d+$',
    group_emoji = '^:(\\w+):(\\d+)$'
}
