import Collection from '../collection/Collection'
import type Role from './Role'
import User from './User'

class Emoji {
  constructor (
        private _id: string = '',
        private _name: string,
        private _roles: Collection<string, Role> | null,
        private _user: User | null,
        private _requiredColons: boolean = false,
        private _managed: boolean = false,
        private _animated: boolean = false,
        private _available: boolean = true
  ) {
    return this
  }

  public get id (): string {
    return this._id
  }

  public get name (): string {
    return this._name
  }

  public get roles (): Collection<string, Role> | null {
    return this._roles
  }

  public get user (): User | null {
    return this._user
  }

  public get requiredColons (): boolean {
    return this._requiredColons
  }

  public get managed (): boolean {
    return this._managed
  }

  public get animated (): boolean {
    return this._animated
  }

  public get avaible (): boolean {
    return this._available
  }
}

export default Emoji
