import { User } from "@resources/User";
import { GatewayUserUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "./Event";

export class UserUpdate extends Event {
  run(data: GatewayUserUpdateDispatchData) {
    const old = structuredClone(
      data.id === this.client.user.id
        ? this.client.user
        : this.client.cache.users.get(data.id)
    );

    const updated = this.client.cache.users.add(data);

    this.client.emit("userUpdate", old, updated);
  }
}