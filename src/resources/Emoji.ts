import { Cache } from "@cache/Cache";
import { UserCache } from "@cache/UserCache";
import { AnyClient, DataWithClient } from "@typings/index";
import {
  APIEmoji,
  APIReaction,
  CDNRoutes,
  ImageFormat,
  RouteBases,
} from "discord-api-types/v10";
import { Snowflake } from "./Base";
import { User } from "./User";

export class Emoji {
  /**
   * whether this emoji must be wrapped in colons
   */
  requireColons?: boolean;
  /**
   * whether this emoji is managed
   */
  managed?: boolean;
  /**
   * whether this emoji can be used, may be false due to loss of Server Boosts
   */
  available?: boolean;
  /**
   * emoji name (can be null only in reaction emoji objects)
   */
  name: string;
  /**
   * whether this emoji is animated
   */
  animated?: boolean;
  /**
   * emoji id
   */
  id: string;

  partial: APIEmoji;

  constructor(data: APIEmoji) {
    this.id = data.id;
    this.requireColons = data.require_colons;
    this.managed = data.managed;
    this.available = data.available;
    this.name = data.name;
    this.animated = Boolean(data.animated);
    this.partial = data;
  }

  createdAt() {
    return this.id && Snowflake.getCreatedAt(this.id);
  }

  /**
   * emoji url
   */
  get url() {
    return (
      this.id &&
      RouteBases.cdn +
        CDNRoutes.emoji(
          this.id,
          this.animated ? ImageFormat.GIF : ImageFormat.PNG
        )
    );
  }

  get uriComponent() {
    return this.id
      ? `${this.animated ? "a:" : ""}${this.name}:${this.id}`
      : encodeURIComponent(this.name);
  }

  toString() {
    return this.id
      ? `<${this.animated ? "a" : ""}:${this.name}:${this.id}>`
      : this.name;
  }

  static from(emoji: string) {
    const r = Emoji.parse(emoji);

    return r && new Emoji(r);
  }

  static parse(emoji: string): APIEmoji {
    if (emoji === encodeURIComponent(emoji)) emoji = decodeURIComponent(emoji);
    if (!emoji.includes(":")) return;

    const r = emoji.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);

    return (
      r && {
        name: r[2],
        id: r[3],
        animated: Boolean(r[1]),
      }
    );
  }

  static getEncodedURI(emoji: string | APIEmoji) {
    if (typeof emoji === "string") {
      emoji = Emoji.parse(emoji);
    }

    return emoji && emoji.id
      ? `${emoji.animated ? "a:" : ""}${emoji.name}:${emoji.id}`
      : encodeURIComponent(emoji.name);
  }
}

export class Reaction {
  /**
   * whether the current user reacted using this emoji
   */
  me: boolean;
  /**
   * emoji information
   */
  emoji: Emoji;
  /**
   * times this emoji has been used to react
   */
  count: number;
  /**
   * Users reacted
   */
  users: UserCache;
  client: AnyClient;
  constructor(data: DataWithClient<APIReaction>) {
    this.me = data.me;
    this.emoji = new Emoji(data.emoji);
    this.count = data.count;
    this.users = new UserCache(
      data.client.cache._cacheLimit("users"),
      data.client.cache
    );
    this.client = data.client
  }
}
