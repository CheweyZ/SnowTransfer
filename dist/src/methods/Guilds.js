"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Endpoints_1 = __importDefault(require("../Endpoints"));
/**
 * Methods for interacting with Guilds
 */
class GuildMethods {
    /**
     * Create a new Guild Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.guild.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler - request handler that calls the rest api
     */
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
     * Create a new Guild, **limited to 10 guilds (you may create more if you are whitelisted)**
     * Check the [discord docs](https://discord.com/developers/docs/resources/guild#create-guild) for more infos
     * @param {object} data data
     * @returns [Guild](https://discord.com/developers/docs/resources/guild#guild-object)
     *
     * @example
     * // Creates a simple guild with the name "Demo Guild"
     * let client = new SnowTransfer('TOKEN')
     * let guildData = {
     *   name: 'Demo Guild'
     * }
     * client.guild.createGuild(guildData)
     */
    async createGuild(data) {
        return this.requestHandler.request(Endpoints_1.default.GUILDS, "post", "json", data);
    }
    /**
     * Get a guild via Id
     *
     * **Your bot has to be a member of the guild for this function to work**
     * @param guildId Id of the guild
     * @returns [Guild object](https://discord.com/developers/docs/resources/guild#guild-object)
     */
    async getGuild(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD(guildId), "get", "json");
    }
    /**
     * Update a guild
     * @param guildId Id of the guild
     * @param data data
     * @returns [Guild object](https://discord.com/developers/docs/resources/guild#guild-object)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     *
     * @example
     * // Update the name of a guild to "Nice Guild"
     * let client = new SnowTransfer('TOKEN')
     * let guildData = {
     *   name: 'Nice Guild'
     * }
     * client.guild.updateGuild('guild Id', guildData)
     */
    async updateGuild(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD(guildId), "patch", "json", data);
    }
    /**
     * Delete a guild
     *
     * **Your bot has to be the owner of the guild to do this**
     *
     * **This action is irreversible, so use it with caution!**
     * @param guildId Id of the guild
     * @returns Resolves the Promise on successful execution
     */
    async deleteGuild(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD(guildId), "delete", "json");
    }
    /**
     * Get a list of channels for a guild
     * @param guildId Id of the guild
     * @returns list of [channels](https://discord.com/developers/docs/resources/channel#channel-object-channel-structure)
     */
    async getGuildChannels(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_CHANNELS(guildId), "get", "json");
    }
    /**
     * Create a channel within a guild
     * @param guildId Id of the guild
     * @param data channel properties
     * @returns [channel object](https://discord.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_CHANNELS    | always    |
     */
    async createGuildChannel(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_CHANNELS(guildId), "post", "json", data);
    }
    /**
     * Batch update the positions of channels
     * @param guildId Id of the guild
     * @returns Resolves the Promise on successful execution
     */
    async updateChannelPositions(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_CHANNELS(guildId), "patch", "json", data);
    }
    /**
     * Get a guild member via Id
     * @param guildId Id of the guild
     * @param memberId Id of the guild member
     * @returns [guild member](https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure)
     */
    async getGuildMember(guildId, memberId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBER(guildId, memberId), "get", "json");
    }
    /**
     * Get a list of guild members
     * @param guildId Id of the guild
     * @param data query data
     * @returns list of [guild members](https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure)
     */
    async getGuildMembers(guildId, data = {}) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBERS(guildId), "get", "json", data);
    }
    /**
     * Add a guild member to a guild via oauth2 access token
     *
     * **You need the oauth2 `guilds.join` scope granted to the access_token**
     *
     *
     * **Your bot has to be a member of the guild you want to add the user to**
     *
     * @param guildId Id of the guild
     * @param memberId Id of the guild member
     * @param data object containing the needed request data
     * @returns [guild member](https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure)
     *
     * | Permissions needed    | Condition |
     * |-----------------------|-----------|
     * | CREATE_INSTANT_INVITE | always    |
     *
     * | OAUTH2 Scopes |
     * |---------------|
     * | guilds.join   |
     *
     * @example
     * // add a user to a server
     * let client = new SnowTransfer('TOKEN')
     * let memberData = {
     *   access_token: 'access token of a user with the guilds.join scope'
     * }
     * client.guild.addGuildMember('guildId', 'memberId', memberData)
     */
    async addGuildMember(guildId, memberId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBER(guildId, memberId), "put", "json", data);
    }
    /**
     * Update properties of a guild member
     *
     * **Check the table below to make sure you have the right permissions for the types of updates**
     *
     * **Make sure that your bot has `CONNECT` and `MOVE_MEMBERS` on the channel you want to move the member to**
     * @param guildId Id of the guild
     * @param memberId Id of the guild member
     * @param data Updated properties
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition    |
     * |--------------------|--------------|
     * | MANAGE_NICKNAMES   | Nick Updates |
     * | MANAGE_ROLES       | Role Updates |
     * | MUTE_MEMBERS       | Mute Updates |
     * | DEAFEN_MEMBERS     | Deaf Updates |
     * | MOVE_MEMBERS       | Voice Move   |
     *
     * @example
     * // Reset the nickname of a guild member
     * let client = new SnowTransfer('TOKEN')
     * let memberData = {
     *   nick: "" // You can reset nicknames by providing an empty string as the value of data.nick
     * }
     * client.guild.updateGuildMember('guild Id', 'memberId', memberData)
     */
    async updateGuildMember(guildId, memberId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBER(guildId, memberId), "patch", "json", data);
    }
    /**
     * Update the nick of the current user
     * @param guildId Id of the guild
     * @param data object with a nick property
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | CHANGE_NICKNAME    | always    |
     *
     * @example
     * // change nick of bot to "Nice Nick"
     * let client = new SnowTransfer('TOKEN')
     * let nickData = {
     *   nick: 'Nice Nick'
     * }
     * client.guild.updateSelf('guildId', nickData)
     */
    async updateSelf(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBER_NICK(guildId, "@me"), "patch", "json", data);
    }
    /**
     * Add a role to a guild member
     * @param guildId Id of the guild
     * @param memberId Id of the guild member
     * @param roleId Id of the role
     * @param data object with reason property
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_ROLES       | always    |
     */
    async addGuildMemberRole(guildId, memberId, roleId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBER_ROLE(guildId, memberId, roleId), "put", "json", data);
    }
    /**
     * Remove a role from a guild member
     * @param guildId Id of the guild
     * @param memberId Id of the guild member
     * @param roleId Id of the role
     * @param data object with reason property
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_ROLES       | always    |
     */
    async removeGuildMemberRole(guildId, memberId, roleId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBER_ROLE(guildId, memberId, roleId), "delete", "json", data);
    }
    /**
     * Remove a guild member (aka kick them)
     * @param guildId Id of the guild
     * @param memberId Id of the guild member
     * @param data object with reason property
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | KICK_MEMBERS       | always    |
     *
     * @example
     * // Kick a member with a reason of "spam"
     * let client = new SnowTransfer('TOKEN')
     * let kickData = {
     *   reason: 'spam'
     * }
     * client.guild.removeGuildMember('guild Id', 'memberId', kickData)
     */
    async removeGuildMember(guildId, memberId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBER(guildId, memberId), "delete", "json", data);
    }
    /**
     * Get bans of a guild
     * @param guildId Id of the guild
     * @returns List of [bans](https://discord.com/developers/docs/resources/guild#ban-object-ban-structure)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | BAN_MEMBERS        | always    |
     */
    async getGuildBans(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_BANS(guildId), "get", "json");
    }
    /**
     * Ban a guild member
     * @param guildId Id of the guild
     * @param memberId Id of the guild member
     * @param data object with a reason and a delete-message-days property
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | BAN_MEMBERS        | always    |
     *
     * @example
     * // Ban a user with a reason and delete the last 2 days of their messages
     * let client = new SnowTransfer('TOKEN')
     * let banData = {
     *   reason: 'Memes were not good enough',
     *   "delete_message_days":2
     * }
     * client.guild.createGuildBan('guild Id', 'memberId', banData)
     */
    async createGuildBan(guildId, memberId, data) {
        let newData;
        if (data) {
            if (data.reason)
                Object.assign(newData, { queryReason: data.reason });
            if (data.delete_message_days)
                Object.assign(newData, { "delete_message_days": data.delete_message_days });
        }
        return this.requestHandler.request(Endpoints_1.default.GUILD_BAN(guildId, memberId), "put", "json", newData);
    }
    /**
     * Remove a ban of a user
     * @param guildId Id of the guild
     * @param memberId Id of the guild member
     * @param data object with a reason property
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | BAN_MEMBERS        | always    |
     */
    async removeGuildBan(guildId, memberId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_BAN(guildId, memberId), "delete", "json", data);
    }
    /**
     * Get a list of roles for a guild
     * @param guildId Id of the guild
     * @returns array of [roles](https://discord.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_ROLES       | always    |
     */
    async getGuildRoles(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_ROLES(guildId), "get", "json");
    }
    /**
     * Create a new Role
     * @param guildId Id of the guild
     * @param data data with role properties
     * @returns [role](https://discord.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_ROLES       | always    |
     *
     * @example
     * // Create a role with the name "Nice Role" and a color of a soft blue
     * let client = new SnowTransfer('TOKEN')
     * let roleData = {
     *   name: 'Nice Role',
     *   color: 0x7c7cf8
     * }
     * client.guild.createGuildRole('guild Id', roleData)
     */
    async createGuildRole(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_ROLES(guildId), "post", "json", data);
    }
    /**
     * Batch modify the positions of roles
     * @param guildId Id of the guild
     * @param data Array of objects with id and position properties
     * @returns array of [roles](https://discord.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_ROLES       | always    |
     */
    async updateGuildRolePositions(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_ROLES(guildId), "put", "json", data);
    }
    /**
     * Update a guild role
     * @param guildId Id of the guild
     * @param roleId Id of the role
     * @param data updated properties of the role
     * @returns [Updated Role](https://discord.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_ROLES       | always    |
     */
    async updateGuildRole(guildId, roleId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_ROLE(guildId, roleId), "patch", "json", data);
    }
    /**
     * Delete a role from the guild
     * @param guildId Id of the guild
     * @param roleId Id of the role
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_ROLES       | always    |
     */
    async removeGuildRole(guildId, roleId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_ROLE(guildId, roleId), "delete", "json");
    }
    /**
     * Get the amount of members that would be pruned when a prune with the passed amount of days would be started
     * @param guildId Id of the guild
     * @param data Object with a days property
     * @returns Object with a "pruned" key indicating the amount of members that would be pruned
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | KICK_MEMBERS       | always    |
     */
    async getGuildPruneCount(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_PRUNE(guildId), "get", "json", data);
    }
    /**
     * Start a prune
     * @param guildId Id of the guild
     * @param data Object with a days property
     * @returns Object with a "pruned" key indicating the amount of members that were pruned
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | KICK_MEMBERS       | always    |
     */
    async startGuildPrune(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_PRUNE(guildId), "post", "json", data);
    }
    /**
     * Get a list of voice regions for the guild, includes vip-regions unlike voice.getVoiceRegions
     * @param guildId Id of the guild
     * @returns List of [voice regions](https://discord.com/developers/docs/resources/voice#voice-region-object)
     */
    async getGuildVoiceRegions(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_VOICE_REGIONS(guildId), "get", "json");
    }
    /**
     * Get invites for a guild
     * @param guildId Id of the guild
     * @returns List of [invites](https://discord.com/developers/docs/resources/invite#invite-object) (with metadata)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    async getGuildInvites(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_INVITES(guildId), "get", "json");
    }
    /**
     * Get integrations for a guild
     * @param guildId Id of the guild
     * @returns List of [integration objects](https://discord.com/developers/docs/resources/guild#integration-object)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    async getGuildIntegrations(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_INTEGRATIONS(guildId), "get", "json");
    }
    /**
     * Attach a integration object from the user to the guild
     * @param guildId Id of the guild
     * @param data Integration object with id and type properties
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    async createGuildIntegration(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_INTEGRATIONS(guildId), "post", "json", data);
    }
    /**
     * Update behaviour and settings of an [integration object](https://discord.com/developers/docs/resources/guild#integration-object)
     * @param guildId Id of the guild
     * @param integrationId Id of the integration
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    async updateGuildIntegration(guildId, integrationId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_INTEGRATION(guildId, integrationId), "patch", "json", data);
    }
    /**
     * Delete a guild integratiom
     * @param guildId Id of the guild
     * @param integrationId Id of the integration
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    async removeGuildIntegration(guildId, integrationId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_INTEGRATION(guildId, integrationId), "delete", "json");
    }
    /**
     * Synchronize a guild integration
     * @param guildId Id of the guild
     * @param integrationId Id of the integration
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    async syncGuildIntegration(guildId, integrationId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_INTEGRATION(guildId, integrationId), "delete", "json");
    }
    /**
     * Get the guild embed object
     * @param guildId Id of the guild
     * @returns [Guild Embed](https://discord.com/developers/docs/resources/guild#guild-embed-object)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    async getGuildEmbed(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_EMBED(guildId), "get", "json");
    }
    /**
     * Update a guild embed object
     * @param guildId Id of the guild
     * @returns [Guild Embed](https://discord.com/developers/docs/resources/guild#guild-embed-object)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    async updateGuildEmbed(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_EMBED(guildId), "patch", "json", data);
    }
}
module.exports = GuildMethods;
