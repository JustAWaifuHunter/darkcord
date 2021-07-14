import type Client from '../Client'
import { headers } from '../constants/PayLoads'
import type { MessageOptions } from '../types/Interfaces'
import { Constants, EndPoints } from '../constants/Constants'
import Fetch from './Fetch'
import fetch from 'node-fetch'

class RestAPI {
    private _token: string = '';
    public fetch: Fetch;
    constructor (private client: Client) {
      this._token = ''
      this.fetch = new Fetch()
    }

    async createMessage (options: MessageOptions, id: string): Promise<any> {
      const res = await fetch(
            `${Constants.API}/${EndPoints.channels}/${id}/${EndPoints.messages}`,
            {
              method: 'POST',
              headers,
              body: JSON.stringify(options)
            })

      return res.json()
    }

    async deleteMessage (channelId: string, messageId: string) {
      return await fetch(
            `${Constants.API}/${EndPoints.channels}/${channelId}/${EndPoints.messages}/${messageId}`,
            {
              method: 'POST',
              headers
            }
      )
    }

    async editMessage (options: MessageOptions, channelId: string, messageId: string) {
      return await fetch(
            `${Constants.API}/${EndPoints.channels}/${channelId}/${EndPoints.messages}/${messageId}`,
            {
              method: 'POST',
              headers,
              body: JSON.stringify(options)
            }
      )
    }

    async banMember (guildId: string, memberId: string, days: number, reason?: string) {
      return await fetch(
        `${Constants.API}/${EndPoints.guilds}/${guildId}/bans/${memberId}`,
        {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            delete_message_days: days,
            reason
          })
        }
      )
    }

    set token (token: string) {
      this._token = token
      headers.Authorization = `Bot ${this._token}`
    }
}

export default RestAPI
