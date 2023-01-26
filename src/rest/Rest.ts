import EventEmitter from "node:events";
import {
  APIApplication,
  APIBan,
  APIChannel,
  APICommandAutocompleteInteractionResponseCallbackData,
  APIDMChannel,
  APIEmoji,
  APIExtendedInvite,
  APIGatewayBotInfo,
  APIGuild,
  APIGuildForumChannel,
  APIGuildIntegration,
  APIGuildMember,
  APIGuildTextChannel,
  APIInteractionResponseCallbackData,
  APIMessage,
  APIOverwrite,
  APIReaction,
  APIRole,
  APIStageInstance,
  APISticker,
  APIThreadMember,
  APIUser,
  APIWebhook,
  GuildTextChannelType,
  InteractionResponseType,
  RESTGetAPIChannelMessagesQuery,
  RESTGetAPIGuildBansQuery,
  RESTPatchAPIChannelJSONBody,
  RESTPatchAPIChannelResult,
  RESTPatchAPIGuildMemberJSONBody,
  RESTPatchAPIGuildRoleJSONBody,
  RESTPatchAPIGuildVoiceStateCurrentMemberJSONBody,
  RESTPostAPIChannelMessagesThreadsJSONBody,
  RESTPostAPIChannelThreadsJSONBody,
  RESTPostAPIChannelWebhookJSONBody,
  RESTPostAPIGuildForumThreadsJSONBody,
  RESTPostAPIGuildPruneJSONBody,
  RESTPostAPIGuildPruneResult,
  RESTPostAPIGuildRoleJSONBody,
  RESTPostAPIGuildScheduledEventJSONBody,
  RESTPostAPIStageInstanceJSONBody,
  RESTPutAPIGuildBanJSONBody,
  Routes,
} from "discord-api-types/v10";
import { RequestHandler, RequestOptions } from "./RequestHandler";
import { MessagePostData, RestEvents } from "@typings/index";
import { extractMessageData } from "../utils";
import { FormData } from "undici";
import { URLSearchParams } from "node:url";

export type BodyInit = FormData | Record<string, any> | string;

export declare interface Rest {
  on<T extends keyof RestEvents>(
    event: T,
    listener: (...args: RestEvents[T]) => any
  ): this;
  on(event: string, listener: (...args: any[]) => any): this;
  once<T extends keyof RestEvents>(
    event: T,
    listener: (...args: RestEvents[T]) => any
  ): this;
  once(event: string, listener: (...args: any[]) => any): this;
  emit<T extends keyof RestEvents>(event: T, ...args: RestEvents[T]): boolean;
  emit(event: string, ...args: any[]): boolean;
}

export class Rest extends EventEmitter {
  requestHandler: RequestHandler;

  get: (router: string) => Promise<unknown>;
  post: (
    router: string,
    body?: BodyInit | undefined,
    options?: Omit<RequestOptions, "body">
  ) => Promise<unknown>;
  patch: (
    router: string,
    body?: BodyInit | undefined,
    options?: Omit<RequestOptions, "body">
  ) => Promise<unknown>;
  delete: (
    router: string,
    options?: Omit<RequestOptions, "body">
  ) => Promise<unknown>;
  put: (
    router: string,
    body?: BodyInit | undefined,
    options?: Omit<RequestOptions, "body">
  ) => Promise<unknown>;

  constructor(public token?: string, public requestTimeout = 15_000) {
    super();

    this.requestHandler = new RequestHandler(this, {
      token,
    });

    // Copy methods
    this.get = this.requestHandler.get.bind(this.requestHandler);
    this.post = this.requestHandler.post.bind(this.requestHandler);
    this.patch = this.requestHandler.patch.bind(this.requestHandler);
    this.delete = this.requestHandler.delete.bind(this.requestHandler);
    this.put = this.requestHandler.put.bind(this.requestHandler);
  }

  /**
   * Post a message to a guild text or DM channel.
   * @returns A message object.
   * @see message [formatting](https://discord.com/developers/docs/reference#message-formatting) for more information on how to properly format messages.
   * @param channelId The id of channel to create message
   */
  createMessage(channelId: string, data: MessagePostData) {
    const { d, contentType } = extractMessageData(data);

    return this.post(Routes.channelMessages(channelId), d, {
      contentType,
    }) as Promise<APIMessage>;
  }

  triggerTyping(channelId: string) {
    return this.post(Routes.channelTyping(channelId));
  }

  deleteMessage(channelId: string, messageId: string, reason?: string) {
    return this.delete(Routes.channelMessage(channelId, messageId), {
      reason,
    }) as Promise<void>;
  }

  getMessage(channelId: string, messageId: string) {
    return this.get(
      Routes.channelMessage(channelId, messageId)
    ) as Promise<APIMessage>;
  }

  getMessages(channelId: string, options: RESTGetAPIChannelMessagesQuery) {
    const query = new URLSearchParams();

    if (options.after) query.append("after", options.after);
    if (options.around) query.append("around", options.around);
    if (options.before) query.append("before", options.before);
    if (options.limit) query.append("limit", options.limit.toString());

    return this.get(
      Routes.channelMessages(channelId) + options ? "?" + query.toString() : ""
    ) as Promise<APIMessage[]>;
  }

  bulkDeleteMessages(channelId: string, messages: string[], reason?: string) {
    return this.post(
      Routes.channelBulkDelete(channelId),
      {
        messages,
      },
      {
        reason,
      }
    ) as Promise<void>;
  }

  respondInteraction(
    interactionId: string,
    interactionToken: string,
    data:
      | MessagePostData
      | APIInteractionResponseCallbackData
      | APICommandAutocompleteInteractionResponseCallbackData,
    type: InteractionResponseType
  ) {
    let d: BodyInit, contentType: string;
    if ("choices" in data) d = data;
    else {
      const extracted = extractMessageData(
        { data: data as MessagePostData, type },
        true
      );

      contentType = extracted.contentType;
      d = extracted.d;
    }

    return this.post(
      Routes.interactionCallback(interactionId, interactionToken),
      d,
      { contentType }
    ) as Promise<void>;
  }

  getWebhookMessage(
    webhookId: string,
    webhookToken: string,
    messageId: string
  ) {
    return this.get(
      Routes.webhookMessage(webhookId, webhookToken, messageId)
    ) as Promise<APIMessage>;
  }

  getUser(userId: string) {
    return this.get(Routes.user(userId)) as Promise<APIUser>;
  }

  getGuild(guildId: string) {
    return this.get(Routes.guild(guildId)) as Promise<APIGuild>;
  }

  getChannel(channelId: string) {
    return this.get(Routes.channel(channelId)) as Promise<APIChannel>;
  }

  getGateway() {
    return this.get(Routes.gatewayBot()) as Promise<APIGatewayBotInfo>;
  }

  getCurrentApplication() {
    return this.get(
      Routes.oauth2CurrentApplication()
    ) as Promise<APIApplication>;
  }

  executeWebhook(
    webhookId: string,
    webhookToken: string,
    data: MessagePostData
  ) {
    const { d, contentType } = extractMessageData(data);

    return this.post(Routes.webhook(webhookId, webhookToken), d, {
      contentType,
    }) as Promise<void>;
  }

  editWebhookMessage(
    webhookId: string,
    webhookToken: string,
    messageId: string,
    data: MessagePostData
  ) {
    const { d, contentType } = extractMessageData(data);

    return this.patch(
      Routes.webhookMessage(webhookId, webhookToken, messageId),
      d,
      { contentType }
    ) as Promise<APIMessage>;
  }

  deleteWebhookWithToken(id: string) {
    return this.delete(Routes.webhook(id, this.token));
  }

  modifyWebhookWithToken(id: string, data: RESTPostAPIChannelWebhookJSONBody) {
    return this.patch(
      Routes.webhook(id, this.token),
      data
    ) as Promise<APIWebhook>;
  }

  createReaction(channelId: string, messageId: string, reaction: string) {
    return this.put(
      Routes.channelMessageReaction(channelId, messageId, reaction)
    ) as Promise<APIReaction>;
  }

  editChannelPermissions(
    channelId: string,
    overwriteId: string,
    overwrite: APIOverwrite,
    reason?: string
  ) {
    return this.put(
      Routes.channelPermission(channelId, overwriteId),
      overwrite,
      { reason }
    ) as Promise<void>;
  }

  getRoles(guildId: string) {
    return this.get(Routes.guildRoles(guildId)) as Promise<APIRole[]>;
  }

  getEmoji(guildId: string, emojiId: string) {
    return this.get(Routes.guildEmoji(guildId, emojiId)) as Promise<APIEmoji>;
  }

  createGuildBan(
    guildId: string,
    userId: string,
    options: RESTPutAPIGuildBanJSONBody,
    reason?: string
  ) {
    return this.put(Routes.guildBan(guildId, userId), options, {
      reason,
    }) as Promise<void>;
  }

  removeGuildBan(guildId: string, userId: string, reason?: string) {
    return this.delete(Routes.guildBan(guildId, userId), {
      reason,
    }) as Promise<void>;
  }

  getGuildBan(guildId: string, userId: string) {
    return this.get(Routes.guildBan(guildId, userId)) as Promise<APIBan>;
  }

  getGuildBans(guildId: string, options?: RESTGetAPIGuildBansQuery) {
    const query = new URLSearchParams();

    if (options.after) query.append("after", options.after);
    if (options.before) query.append("before", options.before);
    if (options.limit) query.append("limit", options.limit.toString());

    return this.get(
      Routes.guildBans(guildId) + options ? "?" + query.toString() : ""
    ) as Promise<APIBan[]>;
  }

  getGuildSticker(guildId: string, stickerId: string) {
    return this.get(
      Routes.guildSticker(guildId, stickerId)
    ) as Promise<APISticker>;
  }

  modifyRolePosition(
    guildId: string,
    roleId: string,
    newPosition: number,
    reason?: string
  ) {
    return this.patch(
      Routes.guildRoles(guildId),
      {
        id: roleId,
        position: newPosition,
      },
      { reason }
    ) as Promise<APIRole[]>;
  }

  getGuildMember(guildId: string, userId: string) {
    return this.get(
      Routes.guildMember(guildId, userId)
    ) as Promise<APIGuildMember>;
  }

  beginGuildPrune(
    guildId: string,
    options: RESTPostAPIGuildPruneJSONBody,
    reason?: string
  ) {
    return this.post(Routes.guildPrune(guildId), options, {
      reason,
    }) as Promise<RESTPostAPIGuildPruneResult>;
  }

  modifyGuildRole(
    guildId: string,
    roleId: string,
    options: RESTPatchAPIGuildRoleJSONBody,
    reason?: string
  ) {
    return this.patch(Routes.guildRole(guildId, roleId), options, {
      reason,
    }) as Promise<APIRole>;
  }

  removeGuildMember(guildId: string, userId: string, reason?: string) {
    return this.delete(Routes.guildMember(guildId, userId), {
      reason,
    }) as Promise<void>;
  }

  addGuildMemberRole(
    guildId: string,
    userId: string,
    roleId: string,
    reason?: string
  ) {
    return this.put(
      Routes.guildMemberRole(guildId, userId, roleId),
      undefined,
      { reason }
    ) as Promise<void>;
  }

  removeGuildMemberRole(
    guildId: string,
    userId: string,
    roleId: string,
    reason?: string
  ) {
    return this.delete(Routes.guildMemberRole(guildId, userId, roleId), {
      reason,
    }) as Promise<void>;
  }

  modifyGuildMember(
    guildId: string,
    userId: string,
    options: RESTPatchAPIGuildMemberJSONBody,
    reason?: string
  ) {
    return this.patch(Routes.guildMember(guildId, userId), options, {
      reason,
    }) as Promise<APIGuildMember>;
  }

  getGuildInvites(guildId: string) {
    return this.get(Routes.guildInvites(guildId)) as Promise<
      APIExtendedInvite[]
    >;
  }

  getGuildIntegrations(guildId: string) {
    return this.get(
      Routes.guildIntegrations(guildId)
    ) as Promise<APIGuildIntegration>;
  }

  deleteGuildIntegration(
    guildId: string,
    integrationId: string,
    reason?: string
  ) {
    return this.delete(Routes.guildIntegration(guildId, integrationId), {
      reason,
    }) as Promise<void>;
  }

  createGuildRole(
    guildId: string,
    options: RESTPostAPIGuildRoleJSONBody,
    reason?: string
  ) {
    return this.post(Routes.guildRoles(guildId), options, {
      reason,
    }) as Promise<APIRole>;
  }

  deleteGuildRole(guildId: string, roleId: string, reason?: string) {
    return this.delete(Routes.guildRole(guildId, roleId), {
      reason,
    }) as Promise<void>;
  }

  joinThread(threadId: string) {
    return this.put(Routes.threadMembers(threadId, "@me")) as Promise<void>;
  }

  leaveThread(threadId: string) {
    return this.delete(Routes.threadMembers(threadId, "@me")) as Promise<void>;
  }

  addThreadMember(threadId: string, userId: string) {
    return this.put(Routes.threadMembers(threadId, userId)) as Promise<void>;
  }

  removeThreadMember(threadId: string, userId: string) {
    return this.delete(Routes.threadMembers(threadId, userId)) as Promise<void>;
  }

  getThreadMember(threadId: string, userId: string, withMember = false) {
    return this.get(
      Routes.threadMembers(threadId, userId) + `?with_member=${withMember}`
    ) as Promise<APIThreadMember>;
  }

  startThread(
    channelId: string,
    data: RESTPostAPIChannelThreadsJSONBody,
    reason?: string
  ) {
    return this.post(Routes.threads(channelId), data, {
      reason,
    }) as Promise<APIGuildTextChannel<GuildTextChannelType>>;
  }

  startThreadInForum(
    channelId: string,
    data: RESTPostAPIGuildForumThreadsJSONBody,
    reason?: string
  ) {
    return this.post(Routes.threads(channelId), data, {
      reason,
    }) as Promise<APIGuildForumChannel>;
  }

  startThreadFromMessage(
    channelId: string,
    messageId: string,
    data: RESTPostAPIChannelMessagesThreadsJSONBody,
    reason?: string
  ) {
    return this.post(Routes.threads(channelId, messageId), data, {
      reason,
    }) as Promise<APIGuildTextChannel<GuildTextChannelType>>;
  }

  createDM(recipientId: string) {
    return this.post(Routes.userChannels(), {
      recipient_id: recipientId,
    }) as Promise<APIDMChannel>;
  }

  deleteChannel(channelId: string) {
    return this.delete(Routes.channel(channelId)) as Promise<void>;
  }

  modifyChannel(
    channelId: string,
    options: RESTPatchAPIChannelJSONBody,
    reason?: string
  ) {
    return this.patch(Routes.channel(channelId), options, {
      reason,
    }) as Promise<RESTPatchAPIChannelResult>;
  }

  createStageInstance(
    options: RESTPostAPIStageInstanceJSONBody,
    reason?: string
  ) {
    return this.post(Routes.stageInstances(), options, {
      reason,
    }) as Promise<APIStageInstance>;
  }

  modifyGuildVoiceState(
    guildId: string,
    userId: string,
    options: RESTPatchAPIGuildVoiceStateCurrentMemberJSONBody
  ) {
    return this.patch(Routes.guildVoiceState(guildId, userId), options);
  }

  createGuildScheduledEvent(
    guildId: string,
    options: RESTPostAPIGuildScheduledEventJSONBody,
    reason?: string
  ) {
    return this.post(Routes.guildScheduledEvents(guildId), options, { reason });
  }

  deleteWebhookMessage(
    webhookId: string,
    webhookToken: string,
    messageId: string,
    threadId?: string
  ) {
    return this.delete(
      Routes.webhookMessage(webhookId, webhookToken, messageId) + threadId
        ? `?thread_id=${threadId}`
        : ""
    ) as Promise<void>;
  }
}