import Collection from '../collection/Collection'
import type Role from './Role'
import type Member from './Member'
import type Emoji from './Emoji'
import GuildChannel from './channels/GuildChannel'
import type Client from '../Client'
import Resolve from '../util/Resolve'

class Guild {
    private _roles: Collection<string, Role>;
    private _members: Collection<string, Member>;
    private _emojis: Collection<string, Emoji>;
    private _channels: Collection<string, GuildChannel>;

    constructor (
        private _id: string,
        private _client: Client,
        private _name: string,
        private _icon: string,
        private _description: string,
        private _splash: string,
        private _discoverySplash: string,
        private _features: any[],
        private _banner: string,
        private _ownerId: string,
        private _applicationId: string,
        private _region: string,
        private _afkChannelId: string,
        private _afkTimeout: string,
        private _systemChannelId: string,
        private _widgetEnabled: boolean,
        private _widgetChannelId: string,
        private _verificationLevel: number,
        private _defaultMessageNotifications: number,
        private _mfaLevel: number,
        private _explicitContentFilter: number,
        private _maxPresences: number,
        private _maxMembers: number,
        private _maxVideoChannelUsers: number,
        private _vanityUrl: string,
        private _premiumTier: number,
        private _premiumSubscriptionCount: number,
        private _systemChannelFlags: number,
        private _preferredLocale: string,
        private _rulesChannelId: string,
        private _publicUpdatesChannelId: string,
        private _embedEnabled: boolean,
        private _embedChannelId: string,
        private _stickers: any[],
        private _nsfw_level: number,
        private _memberCount: number,
        private _presenceCount: number
    ) {
      this._roles = new Collection()
      this._members = new Collection()
      this._emojis = new Collection()
      this._channels = new Collection()
    }

    public get roles (): Collection<string, Role> {
      return this._roles
    }

    public set roles (roles: Collection<string, Role>) {
      this._roles = roles
    }

    public get emojis (): Collection<string, Emoji> {
      return this._emojis
    }

    public set emojis (emojis: Collection<string, Emoji>) {
      this._emojis = emojis
    }

    public get channels (): Collection<string, GuildChannel> {
      return this._channels
    }

    public set channels (channels: Collection<string, GuildChannel>) {
      this._channels = channels
    }

    public get name () {
      return this._name
    }

    public get defaultMessageNotifications (): number {
      return this._defaultMessageNotifications
    }

    public get members (): Collection<string, Member> {
      return this._members
    }

    public get systemChannelFlags (): number {
      return this._systemChannelFlags
    }

    public get region (): string {
      return this._region
    }

    public set members (members: Collection<string, Member>) {
      this._members = members
    }

    public get id (): string {
      return this._id
    }

    public get icon (): string {
      return this._icon
    }

    public get verificationLevel (): number {
      return this._verificationLevel
    }

    public get vanityUrl (): string {
      return this._vanityUrl
    }

    public get description (): string {
      return this._description
    }

    public get splash (): string {
      return this._splash
    }

    public get maxMambers (): number {
      return this._maxMembers
    }

    public get nsfwLevel (): number {
      return this._nsfw_level
    }

    public get afkTimeout (): string {
      return this._afkTimeout
    }

    public get maxPresences (): number {
      return this._maxPresences
    }

    public get presenceCount (): number {
      return this._presenceCount
    }

    public get banner (): string {
      return this._banner
    }

    public get discoverySplash (): string {
      return this._discoverySplash
    }

    public get explicitContentFilter (): number {
      return this._explicitContentFilter
    }

    public get mfaLevel (): number {
      return this._mfaLevel
    }

    public get stickers (): any[] {
      return this._stickers
    }

    public get boosterSubscriptionCount (): number {
      return this._premiumSubscriptionCount
    }

    public get boosterTier (): number {
      return this._premiumTier
    }

    public get applicationId (): string {
      return this._applicationId
    }

    public get memberCount (): number {
      return this._memberCount
    }

    public get client (): Client {
      return this._client
    }

    public get rulesChannelId (): string {
      return this._rulesChannelId
    }

    public get features (): any[] {
      return this._features
    }

    public get ownerId (): string {
      return this._ownerId
    }

    public get owner (): Member | any {
      let owner = this.members.get(this.ownerId)

      if (!owner) {
        const resolve = new Resolve(this.client)

        async () => {
          const ownerMember = await this.client.rest.fetch.member(this.id, this.ownerId)
          owner = resolve.resolveMember(ownerMember, this.id)
          this.members.set(this.ownerId, owner)
        }
      }

      return owner
    }

    public async rulesChannel (): Promise<GuildChannel> {
      let rulesChannel: GuildChannel = await this._client.rest.fetch.channel(this._rulesChannelId)
      const resolve = new Resolve(this._client)
      rulesChannel = await resolve.resolveTextChannel(rulesChannel.id)
      return rulesChannel
    }
}

export default Guild
