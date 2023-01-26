import {
  APIGatewayBotInfo,
  APIUnavailableGuild,
  GatewayCloseCodes,
  GatewayDispatchEvents,
  GatewayIntentBits,
  GatewayOpcodes,
  GatewayPresenceUpdateData,
  GatewayReceivePayload,
  GatewayRequestGuildMembersDataWithQuery,
  GatewayRequestGuildMembersDataWithUserIds,
  GatewaySendPayload,
  GatewayVoiceStateUpdateData,
} from "discord-api-types/v10";
import EventEmitter from "node:events";
import {
  ClientEvents,
  GatewayShardEvents,
  GatewayShardOptions,
  KeysToCamelCase,
} from "@typings/index";
import { MakeError, delay, camelCase } from "@utils/index";
import WebSocket from "ws";
import { Client } from "client/Client";
import { Zlib } from "@utils/Zlib";
import type ZlibSync from "zlib-sync";
import { EventSource } from "./EventSource";
import { WebSocketUtil } from "./WebSocketUtil";
import { GatewayStatus } from "../utils/Constants";
import crypto from "node:crypto";

let zlib: typeof ZlibSync | Zlib;

try {
  zlib = require("zlib-sync");
} catch {
  zlib = new Zlib();
}

const decoder = new TextDecoder();

export const GatewayShardError = (
  message: string,
  code: GatewayCloseCodes,
  shardId: string
) =>
  MakeError({
    name: "GatewayShardError",
    message,
    args: [
      ["code", code],
      ["shardId", shardId],
    ],
  });

export declare interface GatewayShard {
  on<T extends keyof GatewayShardEvents>(
    event: T,
    listener: (...args: GatewayShardEvents[T]) => any
  ): this;
  on(event: string, listener: (...args: any[]) => any): this;
  once<T extends keyof GatewayShardEvents>(
    event: T,
    listener: (...args: GatewayShardEvents[T]) => any
  ): this;
  once(event: string, listener: (...args: any[]) => any): this;
  emit<T extends keyof GatewayShardEvents>(
    event: T,
    ...args: GatewayShardEvents[T]
  ): boolean;
  emit(event: string, ...args: any[]): boolean;
}

export class GatewayShard extends EventEmitter {
  /**
   * The websocket for shard
   */
  ws?: WebSocket;
  ready: boolean;
  connected: boolean;
  preReady: boolean;
  /**
   * The shard sequence id
   */
  sequenceId?: number;
  /**
   * The options of shard
   */
  readonly options: Required<GatewayShardOptions>;
  lastHeartbeatAck: number;
  heartbeatInterval: number;
  heartbeatSendInterval?: NodeJS.Timeout;

  /**
   * Whether shard has destroyed
   */
  destroyed: boolean;
  heartbeatAck: boolean;
  /**
   * The id of this gateway shard
   */
  readonly shardId: string;
  /**
   * This gateway shard ping
   */
  ping: number;
  /**
   * The fetched gateway bot info object
   */
  fetchedGateway?: APIGatewayBotInfo;
  /**
   * The id of shard session
   */
  sessionId?: string;
  /**
   * The size of pending guilds
   */
  pendingGuilds?: number;
  /**
   * Pending guilds map
   */
  pendingGuildsMap: Map<string, APIUnavailableGuild>;
  /**
   * The time of shard is online
   */
  uptime?: Date;
  _inflate: import("zlib-sync").Inflate;
  events: EventSource;
  status: GatewayStatus;
  queueProcessing: boolean;
  queue: CallableFunction[];
  resumeURL?: string;
  closeSequenceId?: number;

  constructor(public client: Client, options?: GatewayShardOptions) {
    super();

    this.connected = false;
    this.preReady = false;
    this.ready = false;
    this.destroyed = false;
    this.heartbeatAck = false;
    this.lastHeartbeatAck = -1;
    this.heartbeatInterval = -1;
    this.ping = -1;
    this.status = GatewayStatus.Disconnected;
    this.options = Object.freeze(
      Object.assign({
        encoding: options.encoding ?? "json",
        compress: Boolean(options.compress),
        shardId: options.shardId ?? "0",
      })
    ) as Readonly<Required<GatewayShardOptions>>;

    this.shardId = this.options.shardId;
    this.pendingGuildsMap = new Map();
    this.events = new EventSource(this);
    this.queue = [];
    this.queueProcessing = false;
  }

  debug(message: string) {
    return this.emit("debug", message);
  }

  _makeErr(message: string, code: number) {
    return GatewayShardError(message, code, this.shardId);
  }

  async #handleClose(code: GatewayCloseCodes) {
    let errMessage: string;
    switch (code) {
      case GatewayCloseCodes.UnknownOpcode: {
        errMessage = "Received unknown op code";
        break;
      }
      case GatewayCloseCodes.NotAuthenticated: {
        errMessage = "Not Authorized: Payload was sent before Identifying";
        break;
      }
      case GatewayCloseCodes.AlreadyAuthenticated: {
        errMessage = "Already Authenticated";
        break;
      }
      case GatewayCloseCodes.AuthenticationFailed: {
        errMessage = "Invalid Discord Token";
        break;
      }
      case GatewayCloseCodes.RateLimited: {
        errMessage = "You're rate limited";
        break;
      }
      case GatewayCloseCodes.InvalidIntents: {
        errMessage = "Invalid intents was provided";
        break;
      }
      case GatewayCloseCodes.DisallowedIntents: {
        errMessage = "Intents is not whitelisted";
        break;
      }
      case GatewayCloseCodes.DecodeError: {
        errMessage = "Invalid payload was sent";
        break;
      }
      case GatewayCloseCodes.InvalidAPIVersion: {
        errMessage = "Invalid API Version";
        break;
      }
      case GatewayCloseCodes.ShardingRequired: {
        errMessage = "Couldn't connect. Sharding is required!";
        break;
      }
      case GatewayCloseCodes.UnknownError: {
        this.debug("Unknown error encountered. Reconnecting...");
        return this.reconnect();
      }
      case GatewayCloseCodes.InvalidSeq: {
        this.debug("Invalid Seq was sent. Reconnecting....");
        return this.reconnect();
      }
      case GatewayCloseCodes.InvalidShard: {
        this.debug("Invalid shard was sent. Reconnecting...");
        return this.reconnect();
      }
      default: {
        this.debug("Unknown close code. Reconnecting in 5s.");
        await delay(5_000);
        return this.reconnect();
      }
    }

    throw this._makeErr(errMessage, code);
  }

  #onOpen() {
    this.debug("Connected to Discord Gateway");
    this.emit("connect");
  }

  #onClose(event: WebSocket.CloseEvent) {
    if (this.destroyed) return;

    this.closeSequenceId = this.sequenceId;

    const { code, reason } = event;

    if (reason === "Discord Gateway Reconnect") return;

    this.emit("close", code, reason);
    this.debug(`Connection closed with code: ${code} ${reason}`);

    this.status = GatewayStatus.Disconnected;

    this.#handleClose(code);
  }

  #onPacket(data: GatewayReceivePayload | GatewaySendPayload) {
    this.client.emit("packet", data)
    switch (data.op) {
      case GatewayOpcodes.Hello: {
        this.heartbeatInterval = data.d.heartbeat_interval;
        this.debug(
          `Received Hello, heartbeat interval: ${this.heartbeatInterval}`
        );

        this.heartbeatSendInterval = setInterval(() => {
          this.ackHeartbeat();
        }, this.heartbeatInterval);

        this.emit("hello");

        if (this.preReady === false) {
          this.preReady = true;
          this.identify();
        } else {
          this.resume();
        }
        break;
      }
      case GatewayOpcodes.HeartbeatAck: {
        this.heartbeatAck = true;
        this.ping = Date.now() - this.lastHeartbeatAck;
        this.emit("ping", this.ping);
        this.debug(`Received heartbeat ack. Pong: ${this.ping}`);
        break;
      }
      case GatewayOpcodes.InvalidSession: {
        this.debug(
          `Invalid Session received. Resumable: ${
            data.d === true ? "Yes" : "No"
          }`
        );

        if (data.d === false) {
          this.sessionId = undefined;
          this.sequenceId = undefined;
        }

        this.identify();
        break;
      }
      case GatewayOpcodes.Dispatch: {
        this.heartbeatAck = true;

        if (data.s) {
          this.sequenceId = data.s;
        }

        if (data.t) {
          const eventName = camelCase(data.t) as keyof ClientEvents;

          this.emit("dispatch", eventName, data.d);

          if (data.t === GatewayDispatchEvents.Resumed) {
            this.status = GatewayStatus.Ready;
            this.heartbeatAck = true;

            this.debug(
              `Resumed session ${this.sessionId}. Replayed ${
                data.s - this.closeSequenceId
              }`
            );

            this.sendHeartbeat();
          }

          if (
            !this.client.options.gateway?.disabledEvents?.includes(eventName)
          ) {
            this.events.get(eventName)?.(data.d);
          }
        }
        break;
      }
      case GatewayOpcodes.Resume: {
        this.sessionId = data.d.session_id;
        this.sequenceId = data.d.seq;

        this.emit("resume");
        break;
      }
      case GatewayOpcodes.Reconnect: {
        this.emit("reconnectRequired");
        this.debug("Received reconnect Op Code");
        this.reconnect();
        break;
      }
    }
  }

  #onMessage(message: WebSocket.MessageEvent) {
    try {
      let data = message.data as any;

      if (data instanceof ArrayBuffer) {
        data = new Uint8Array(data);
      }

      if (this.options.compress) {
        try {
          if (zlib instanceof Zlib) {
            data = zlib.decompress(data);
          } else {
            if (!this._inflate) {
              this._inflate = new zlib.Inflate({
                chunkSize: 65535,
                to: this.options.encoding === "json" ? "string" : undefined,
              });
            }

            const l = data.length;
            const flush =
              l >= 4 &&
              data[l - 4] === 0x00 &&
              data[l - 3] === 0x00 &&
              data[l - 2] === 0xff &&
              data[l - 1] === 0xff;

            this._inflate.push(data, flush && zlib.Z_SYNC_FLUSH);
            data = this._inflate.result;
          }
        } catch (err) {
          this.emit("error", err);
          return;
        }
      }

      try {
        if (this.options.encoding === "json") {
          if (typeof data !== "string") {
            data = decoder.decode(data as Uint8Array);
          }

          data = JSON.parse(data);
        } else {
          if (!Buffer.isBuffer(data)) {
            data = Buffer.from(new Uint8Array(data as ArrayBuffer));
          }

          data = WebSocketUtil.unpack(data as Buffer, "etf");
        }
      } catch (err) {
        this.emit("error", err);
      }

      this.#onPacket(data);
    } catch (err) {
      this.emit("error", err);
    }
  }

  send(data: GatewaySendPayload, important = false) {
    const sender = () =>
      this.ws?.send(WebSocketUtil.pack(data, this.options.encoding));

    if (important) this.queue.unshift(sender);
    else this.queue.push(sender);

    if (!this.queueProcessing) {
      this.processQueue();
    }
  }

  async processQueue() {
    if (this.queueProcessing || this.queue.length === 0) {
      return;
    }

    this.queueProcessing = true;
    await this.queue[0]();
    await delay(5_000);

    if (this.queue.length === 0) {
      this.queueProcessing = false;
      return;
    }

    await this.processQueue();
  }

  /**
   * Send heartbeat to discord
   */
  sendHeartbeat() {
    this.send(
      {
        op: GatewayOpcodes.Heartbeat,
        d: this.sequenceId ?? null,
      },
      true
    );

    this.lastHeartbeatAck = Date.now();
  }

  ackHeartbeat() {
    if (this.destroyed === true) {
      return;
    }

    if (this.heartbeatAck === true) {
      this.heartbeatAck = false;
    } else {
      this.debug("Dead connection found, reconnecting gateway...");
      clearInterval(this.heartbeatSendInterval);
      this.reconnect();
      return;
    }

    this.sendHeartbeat();
  }

  resume() {
    if (this.sessionId === undefined) {
      this.identify();
    }

    this.status = GatewayStatus.Resuming;

    this.send(
      {
        op: GatewayOpcodes.Resume,
        d: {
          token: this.client.token,
          session_id: this.sessionId as string,
          seq: this.sequenceId as number,
        },
      },
      true
    );
  }

  identify() {
    if (!this.preReady) {
      return;
    }

    const customProps = this.client.options.gateway?.properties;

    this.status = GatewayStatus.Identifying;

    this.send(
      {
        op: GatewayOpcodes.Identify,
        d: {
          token: this.client.token,
          intents: this.client.options.gateway.intents as GatewayIntentBits,
          properties: {
            browser: customProps?.browser ?? "Darkcord",
            os: process.platform,
            device: customProps?.device ?? "Darkcord",
          },
          compress: this.options.compress,
          shard: [
            Number(this.shardId),
            this.client.options.gateway?.totalShards ??
              (this.fetchedGateway?.shards as number),
          ],
        },
      },
      true
    );
  }

  requestGuildMembers(
    options: KeysToCamelCase<
      | GatewayRequestGuildMembersDataWithQuery &
          GatewayRequestGuildMembersDataWithUserIds
    >
  ) {
    if (options.query && !options.limit) {
      throw MakeError({
        name: "MissingProperty",
        message: "limit property not received",
      });
    }

    const nonce = options.nonce ?? crypto.randomUUID();

    this.send({
      op: GatewayOpcodes.RequestGuildMembers,
      d: {
        guild_id: options.guildId,
        limit: options.limit ?? 0,
        query: options.userIds?.length ? undefined : options.query ?? "",
        presences: options.presences,
        user_ids: options.userIds,
        nonce,
      },
    });
  }

  updateVoiceState(options: KeysToCamelCase<GatewayVoiceStateUpdateData>) {
    this.send({
      op: GatewayOpcodes.VoiceStateUpdate,
      d: {
        guild_id: options.guildId,
        channel_id: options.channelId ?? null,
        self_deaf: Boolean(options.selfDeaf),
        self_mute: Boolean(options.selfMute),
      },
    });
  }

  sendPresence(data: GatewayPresenceUpdateData) {
    this.send({
      op: GatewayOpcodes.PresenceUpdate,
      d: data,
    });
  }

  /**
   * Close this gateway
   * @param code Close code
   * @param reason Close reason
   */
  close(code: number, reason?: string) {
    this.status = GatewayStatus.Closing;

    this.debug(
      `Closing Gateway with code ${code}${
        reason ? ` and reason ${reason}` : ""
      } `
    );
    this.ws?.close(code, reason);

    this.ws?.removeEventListener("close", this.#onClose);
    this.ws?.removeEventListener("message", this.#onMessage);
    this.ws?.removeEventListener("open", this.#onOpen);
    this.ws = undefined;
  }

  init() {
    this.status = GatewayStatus.Connecting;

    let gatewayURL = `wss://gateway.discord.gg/?v=10&encoding=${this.options.encoding}`;

    if (this.options.compress) {
      gatewayURL += "&compress=zlib-stream";
    }

    this.ws = new WebSocket(gatewayURL);
    this.ws.binaryType = "arraybuffer";
    this.ws.onopen = this.#onOpen.bind(this);
    this.ws.onmessage = this.#onMessage.bind(this);
    this.ws.onclose = this.#onClose.bind(this);
  }

  /**
   * Connect shard to discord gateway
   */
  async connect() {
    if (!this.fetchedGateway) {
      this.fetchedGateway = await this.client.rest.getGateway();
    }

    this.init();
  }

  /**
   * Reconnect shard to discord gateway
   * @returns
   */
  reconnect() {
    if (this.destroyed) {
      return;
    }

    this.status = GatewayStatus.Reconnecting;
    this.emit("reconnecting");
    this.debug("Discord asked to reconnect, reconnecting gateway...");
    clearInterval(this.heartbeatSendInterval);
    this.close(1000, "Discord Gateway Reconnect");
    this.init();
  }

  /**
   * Destroy this gateway shard
   */
  destroy() {
    this.debug("Destroying shard...");
    this.destroyed = true;
    this.status = GatewayStatus.Destroyed;

    if (this.heartbeatSendInterval !== undefined) {
      clearInterval(this.heartbeatSendInterval);
      this.heartbeatSendInterval = undefined;
    }

    this.close(1000, "Shard destroyed");
  }
}