import EventEmitter from 'events'
import RestAPI from './rest/RestAPI'
import WebSocket from './ws/WebSocket'
import { Events } from './constants/Events'
import Intents from './util/Intents'
import Collection from './collection/Collection'
import type User from './structures/User'
import type Guild from './structures/Guild'
import type BaseChannel from './structures/channels/BaseChannel'
import type Emoji from './structures/Emoji'
import type { ClientOptions, ClientOptions2 } from './types/Interfaces'
import type { IntentsType } from './types/Types'
import type Message from './structures/Message'
import type Reaction from './structures/Reaction'

declare interface Client {
  on (event: string | symbol, listener: (...args: any[]) => void): Client
  on (event: 'message', listener: (message: Message) => void): Client
  on (event: 'reaction', listener: (reaction: Reaction) => void): Client
  on (event: 'reactionRemove', listener: (reaction: Reaction) => void): Client
  on (event: 'ready', listener: () => void): Client
  on (event: 'guildCreate', listener: (guild: Guild) => void): Client
  on (event: 'guildDelete', listener: (guildId: string) => void): Client
}

/** DarkCord Client */
class Client extends EventEmitter {
    public rest: RestAPI;
    private socket: WebSocket;
    public token: string = '';
    private startedAt: number | null;
    public options: ClientOptions2;
    public users: Collection<string, User>;
    public guilds: Collection<string, Guild>;
    public emojis: Collection<string, Emoji>;
    public channels: Collection<string, BaseChannel>;
    public user: User | any;

    constructor (private _options?: ClientOptions) {
      super()

      this.users = new Collection()
      this.guilds = new Collection()
      this.emojis = new Collection()
      this.channels = new Collection()

      let intents = 0
      if (this._options?.intents) {
        for (const intent of this._options?.intents!) {
          if (typeof intent === 'string') {
            if (Intents[<IntentsType>intent]) {
              intents |= Intents[<IntentsType>intent]
            }
          } else {
            intents |= intent
          }
        }
      }

      this.options = {
        token: this._options?.token,
        apiVersion: this._options?.apiVersion ?? 9,
        intents: intents,
        shardCount: this._options?.shardCount ?? 0,
        cache: {
          guilds: this._options?.cache?.guilds ?? true,
          users: this._options?.cache?.users ?? true,
          roles: this._options?.cache?.roles ?? true,
          channels: this._options?.cache?.channels ?? true,
          presences: this._options?.cache?.presences ?? true,
          overwrites: this._options?.cache?.overwrites ?? true,
          emojis: this._options?.cache?.emojis ?? true
        }
      }

      this.rest = new RestAPI(this)
      this.socket = new WebSocket(this)
      this.token = this.options?.token ?? ''

      this.startedAt = null
    }

    /** Connect bot to Discord API */
    async login (token: string = this.token): Promise<Client> {
      if (!token) throw new Error('Invalid token.')
      this.token = token = token.replace(/^(Bot|Bearer)/i, '')
      this.rest.token = token

      this.emit(Events.DEBUG, `Token: ${this.token}`)

      try {
        await this.socket.connect(this.options.shardCount || 0)
        this.startedAt = Date.now()
        return this
      } catch (err) {
        throw new Error(err)
      }
    }

    /** Get bot uptime */
    get uptime (): number | null {
      return this.startedAt ? Date.now() - this.startedAt! : null
    }

    on (event: string | symbol, listener: (...args: any[]) => void) {
      super.on(event, listener)
      return this
    }
}

export default Client
