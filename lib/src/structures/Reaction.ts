import type TextChannel from './channels/TextChannel'
import type Emoji from './Emoji'
import type Guild from './Guild'
import type Member from './Member'
import type Message from './Message'
import type User from './User'

class Reaction {
  constructor (
        private _user: User,
        private _channel: TextChannel,
        private _message: Message,
        private _guild: Guild,
        private _emoji: Emoji,
        private _member?: Member
  ) {
    return this
  }

  public get user (): User {
    return this._user
  }

  public get channel (): TextChannel {
    return this._channel
  }

  public get message (): Message {
    return this._message
  }

  public get guild (): Guild {
    return this._guild
  }

  public get member (): Member | null {
    return this?._member ?? null
  }

  public get emoji (): Emoji {
    return this._emoji
  }
}

export default Reaction
