import TextChannel from './channels/TextChannel'
import Client from '../Client'
import Guild from './Guild'
import User from './User'
import { MessageOptions } from '../types/Interfaces'
import Embed from './Embed'
import type Member from './Member'

class Message {
    private _embeds: Embed[] = [];
    constructor (
        private _client: Client,
        private _id: string,
        private _channel: TextChannel,
        private _guild: Guild | null,
        private _author: User,
        private _member: Member | null,
        private _content: string,
        private _timestamp: Date,
        private _editedAt: Date,
        private _tts: boolean,
        private _mentionedEveryone: boolean,
        private _nonce: number | string,
        private _pinned: boolean,
        private _type: number
    ) {
      return this
    }

    public get client (): Client {
      return this._client
    }

    public get id (): string {
      return this._id
    }

    public get guild (): Guild | null {
      return this._guild
    }

    public get author (): User {
      return this._author
    }

    public get channel (): TextChannel {
      return this._channel
    }

    public set embeds (embeds: Embed[]) {
      this._embeds = embeds
    }

    public get content (): string {
      return this._content
    }

    public get member (): Member | null {
      return this._member
    }

    public get timestamp (): Date {
      return this._timestamp
    }

    public get type (): number {
      return this._type
    }

    public get tts (): boolean {
      return this._tts
    }

    public get pinned (): boolean {
      return this._pinned
    }

    public get nonce (): string | number {
      return this._nonce
    }

    public get mentionedEveryone (): boolean {
      return this._mentionedEveryone
    }

    public get editedAt () {
      return this._editedAt ? this._editedAt : null
    }

    public async edit (newContent: string | Embed | MessageOptions) {
      if (typeof newContent === 'string') {
        return this.client.rest.editMessage({ content: newContent }, this.channel.id, this.id)
      } else if (newContent instanceof Embed) {
        return this.client.rest.editMessage({ embeds: [newContent] }, this.channel.id, this.id)
      } else {
        return this.client.rest.editMessage(
          {
            content: newContent.content,
            embeds: newContent.embeds,
            tts: newContent.tts || false
          }, this.channel.id, this.id)
      }
    }
}

export default Message
