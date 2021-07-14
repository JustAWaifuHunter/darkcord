import { MessageOptions, TextBasedChannel } from '../../types/Interfaces'
import GuildChannel from './GuildChannel'
import type Guild from '../Guild'
import type { ChannelTypeDef, MessageContent } from '../../types/Types'
import type Client from '../../Client'
import Embed from '../Embed'
import Resolve from '../../util/Resolve'
import Collection from '../../collection/Collection'
import Message from '../Message'

class TextChannel extends GuildChannel implements TextBasedChannel {
    private _messages: Collection<string, Message> = new Collection();
    private resolve: Resolve;
    _client: Client
    constructor (
      _id: string,
      _client: Client,
      _type: ChannelTypeDef,
      _lastMessageId: string,
      _lastPinTimestamp: Date,
      _name: string,
      _position: number,
      _parentId: string,
      _topic: string,
      _guild: Guild,
      _permissionOverwrites: any[],
      _nsfw: boolean,
      _rateLimitPerUser: number
    ) {
      super(
        _id,
        _client,
        _type,
        _name,
        _lastMessageId,
        _lastPinTimestamp,
        _position,
        _parentId,
        _topic,
        _guild,
        _permissionOverwrites,
        _nsfw,
        _rateLimitPerUser
      )

      this._client = _client
      this.resolve = new Resolve(this.client)
    }

    public get messages (): Collection<string, Message> {
      return this._messages
    }

    public get client (): Client {
      return this._client
    }

    public async send (content: MessageContent) {
      if (typeof content === 'string') {
        const body: MessageOptions = { content }
        const res = await this.client.rest.createMessage(body, this.id)
        res.guild_id = this.guild.id
        return await this.resolve.resolveMessage(res)
      }

      if (content instanceof Embed) {
        const options: MessageOptions = {
          embeds: [content]
        }

        const res = await this.client.rest.createMessage(options, this.id)
        res.guild_id = this.guild.id
        return await this.resolve.resolveMessage(res)
      }

      const res = await this.client.rest.createMessage(content, this.id)
      return await this.resolve.resolveMessage(res)
    }
}

export default TextChannel
