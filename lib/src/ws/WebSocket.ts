import EventEmitter from 'events'
import Client from '../Client'
import ShardManager from '../gateway/ShardManager'

/** DarkCord WebSocket Manager */
class WsManager extends EventEmitter {
    private shards: ShardManager;
    constructor (private client: Client) {
      super()

      this.shards = new ShardManager(this.client)
    }

    /** Spawn Shards */
    async connect (shards: number) {
      try {
        for (let shard = 0; shard <= shards; ++shard) {
          this.shards.spawn(shard.toString())
        }
      } catch (err) {
        throw new Error(err)
      }
    }
}

export default WsManager
