import { GatewayGuildRoleUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "./Event";

export class GuildRoleUpdate extends Event {
    run(data: GatewayGuildRoleUpdateDispatchData) {
        const guild = this.getGuild(data.guild_id)

        if (!guild) return

        const old = structuredClone(guild.roles.get(data.role.id))
        const updated = guild.roles.add(data.role)

        this.client.emit("guildRoleUpdate", old, updated, guild)
    }
}