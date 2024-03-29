import { CacheManager } from "@cache/CacheManager";
import { Emoji } from "@resources/Emoji";
import { Guild } from "@resources/Guild";
import { BaseCacheOptions } from "@typings/index";
import { APIEmoji, APIGuild } from "discord-api-types/v10";
import { DataManager } from "./DataManager";
import { Forge, Forged } from "@resources/forge/Forgified";

export class EmojiDataManager extends DataManager<Emoji> {
  constructor(
    options: number | BaseCacheOptions,
    public manager: CacheManager,
  ) {
    super(options, (get, id) => {
      const emoji = get(id);
      return emoji && this.#resolve(emoji);
    });
  }

  get(id: string) {
    return this.cache.get(id);
  }

  #resolve(emoji: APIEmoji | Emoji, addInCache = false) {
    if (emoji && !(emoji instanceof Emoji)) {
      emoji = new Emoji(emoji);
    }

    if (addInCache) this.add(emoji);

    return emoji as Emoji;
  }

  add(emoji: Emoji | APIEmoji, replace = true): Emoji {
    return super.add(this.#resolve(emoji), replace, emoji.id || emoji.name!);
  }

  forge(idOrName: string): Emoji;
  forge(data: Forged<APIEmoji, never>): Emoji;
  forge(data: Forged<APIEmoji, never> | string) {
    if (typeof data !== "string" && !data.id && !data.name) {
      throw new Error("Emoji id or name is required to be forged");
    }

    const forged = new Forge(this.manager.client, Emoji).forge(
      typeof data === "string" ? { id: data } : data,
    );

    return this.add(forged, false);
  }

  /**
   *
   * @param id emoji id
   * @param guild Guild object or Guild Id
   */
  async fetch(id: string, guild: APIGuild | Guild | string) {
    const emoji = await this.manager.client.rest.getEmoji(
      typeof guild === "string" ? guild : guild.id,
      id,
    );

    return this.add(emoji);
  }
}

export class GuildEmojiDataManager extends EmojiDataManager {
  constructor(
    options: number | BaseCacheOptions,
    public manager: CacheManager,
    public guild: Guild,
  ) {
    super(options, manager);
  }

  fetch(id: string) {
    return super.fetch(id, this.guild);
  }
}
