import Client from './src/Client'
import type { ClientOptions } from './src/types/Interfaces'
import * as Constants from './src/constants/Constants'
import Intents from './src/util/Intents'
import Collection from './src/collection/Collection'
import BitField from './src/util/BitField'
import Role from './src/structures/Role'
import Member from './src/structures/Member'
import User from './src/structures/User'
import Resolve from './src/util/Resolve'
import Embed from './src/structures/Embed'
import Message from './src/structures/Message'
import Guild from './src/structures/Guild'
import TextChannel from './src/structures/channels/TextChannel'
import Emoji from './src/structures/Emoji'
import BaseChannel from './src/structures/channels/BaseChannel'
import GuildChannel from './src/structures/channels/GuildChannel'
import Shard from './src/gateway/Shard'
import ShardManager from './src/gateway/ShardManager'
import DMChannel from './src/structures/channels/DMChannel'
import CacheManager from './src/structures/cache/CacheManager'
import WsManager from './src/ws/WebSocket'
import RestAPI from './src/rest/RestAPI'
import Reaction from './src/structures/Reaction'
import Command from './src/structures/command/Command'
import CommandContext from './src/structures/command/CommandContext'
import ClientUser from './src/ClientUser'
import DFormats from './src/util/DFormats'

/** DarkCord Function
 * @param options Client options
 * @returns DarkCord Client
 */
function DarkCord (options?: ClientOptions): Client {
  return new Client(options)
}

DarkCord.Client = Client
DarkCord.Constants = Constants
DarkCord.Intents = Intents
DarkCord.Collection = Collection
DarkCord.BitField = BitField
DarkCord.Role = Role
DarkCord.Member = Member
DarkCord.User = User
DarkCord.Resolve = Resolve
DarkCord.Embed = Embed
DarkCord.Message = Message
DarkCord.Guild = Guild
DarkCord.TextChannel = TextChannel
DarkCord.BaseChannel = BaseChannel
DarkCord.GuildChannel = GuildChannel
DarkCord.DMChannel = DMChannel
DarkCord.Emoji = Emoji
DarkCord.Shard = Shard
DarkCord.ShardManager = ShardManager
DarkCord.CacheManager = CacheManager
DarkCord.WebSocket = WsManager
DarkCord.Rest = RestAPI
DarkCord.Reaction = Reaction
DarkCord.Command = Command
DarkCord.CommandContext = CommandContext
DarkCord.ClientUser = ClientUser
DarkCord.Format = DFormats

export default DarkCord
