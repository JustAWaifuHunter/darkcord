import type Client from '../../Client'
import { CacheTypes } from '../../types/Types'

class CacheManager {
  constructor (public client: Client) {}

  manage (type: CacheTypes, key: string, value: any) {
    if (this.client.options.cache[type]) {
      this.client[type].set(key, value)
      return true
    } else {
      return false
    }
  }
}

export default CacheManager
