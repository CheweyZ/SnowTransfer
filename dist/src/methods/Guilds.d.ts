/**
 * Methods for interacting with Guilds
 */
declare class GuildMethods {
    requestHandler: import("../RequestHandler");
    /**
     * Create a new Guild Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.guild.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler - request handler that calls the rest api
     */
    constructor(requestHandler: import("../RequestHandler"));
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
    createGuild(data: CreateGuildData): Promise<import("@amanda/discordtypings").GuildData>;
    /**
     * Get a guild via Id
     *
     * **Your bot has to be a member of the guild for this function to work**
     * @param guildId Id of the guild
     * @returns [Guild object](https://discord.com/developers/docs/resources/guild#guild-object)
     */
    getGuild(guildId: string, options?: {
        with_counts?: boolean;
    }): Promise<import("@amanda/discordtypings").GuildData>;
    getGuildPreview(guildId: string): Promise<import("@amanda/discordtypings").GuildPreviewData>;
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
    updateGuild(guildId: string, data: UpdateGuildData): Promise<import("@amanda/discordtypings").GuildData>;
    /**
     * Delete a guild
     *
     * **Your bot has to be the owner of the guild to do this**
     *
     * **This action is irreversible, so use it with caution!**
     * @param guildId Id of the guild
     * @returns Resolves the Promise on successful execution
     */
    deleteGuild(guildId: string): Promise<void>;
    /**
     * Get a list of channels for a guild
     * @param guildId Id of the guild
     * @returns list of [channels](https://discord.com/developers/docs/resources/channel#channel-object-channel-structure)
     */
    getGuildChannels(guildId: string): Promise<Array<import("@amanda/discordtypings").GuildChannelData>>;
    /**
     * Create a channel within a guild
     * @param guildId Id of the guild
     * @param data channel properties
     * @returns [channel object](https://discord.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | Condition                                     |
     * |--------------------|-----------------------------------------------|
     * | MANAGE_CHANNELS    | always                                        |
     * | ADMINISTRATOR      | setting MANAGE_ROLES in permission_overwrites |
     */
    createGuildChannel(guildId: string, data: CreateGuildChannelData): Promise<import("@amanda/discordtypings").GuildChannelData>;
    /**
     * Batch update the positions of channels
     * @param guildId Id of the guild
     * @returns Resolves the Promise on successful execution
     */
    updateChannelPositions(guildId: string, data: Array<{
        id: string;
        position?: number | null;
        lock_permissions?: boolean | null;
        parent_id?: string | null;
    }>): Promise<void>;
    /**
     * Get a guild member via Id
     * @param guildId Id of the guild
     * @param memberId Id of the guild member
     * @returns [guild member](https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure)
     */
    getGuildMember(guildId: string, memberId: string): Promise<import("@amanda/discordtypings").MemberData>;
    /**
     * Get a list of guild members
     * @param guildId Id of the guild
     * @param data query data
     * @returns list of [guild members](https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure)
     */
    getGuildMembers(guildId: string, data?: GetGuildMembersData): Promise<Array<import("@amanda/discordtypings").MemberData>>;
    /**
     * Get a list of guild members that match a query
     * @param guildId Id of the guild
     * @param options query data
     * @returns list of [guild members](https://discord.com/developers/docs/resources/guild#guild-member-object-guild-member-structure)
     */
    searchGuildMembers(guildId: string, options: {
        query?: string;
        limit?: number;
    }): Promise<Array<import("@amanda/discordtypings").MemberData>>;
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
    addGuildMember(guildId: string, memberId: string, data: AddGuildMemberData): Promise<import("@amanda/discordtypings").MemberData>;
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
    updateGuildMember(guildId: string, memberId: string, data: UpdateGuildMemberData): Promise<void>;
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
    updateSelf(guildId: string, data: {
        nick: string;
    }): Promise<void>;
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
    addGuildMemberRole(guildId: string, memberId: string, roleId: string, data?: {
        reason?: string;
    }): Promise<void>;
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
    removeGuildMemberRole(guildId: string, memberId: string, roleId: string, data?: {
        reason?: string;
    }): Promise<void>;
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
    removeGuildMember(guildId: string, memberId: string, data?: {
        reason?: string;
    }): Promise<void>;
    /**
     * Get bans of a guild
     * @param guildId Id of the guild
     * @returns List of [bans](https://discord.com/developers/docs/resources/guild#ban-object-ban-structure)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | BAN_MEMBERS        | always    |
     */
    getGuildBans(guildId: string): Promise<Array<any>>;
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
    createGuildBan(guildId: string, memberId: string, data?: {
        reason?: string;
        delete_message_days?: number;
    }): Promise<void>;
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
    removeGuildBan(guildId: string, memberId: string, data?: {
        reason?: string;
    }): Promise<void>;
    /**
     * Get a list of roles for a guild
     * @param guildId Id of the guild
     * @returns array of [roles](https://discord.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_ROLES       | always    |
     */
    getGuildRoles(guildId: string): Promise<Array<import("@amanda/discordtypings").RoleData>>;
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
    createGuildRole(guildId: string, data?: RoleOptions): Promise<import("@amanda/discordtypings").RoleData>;
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
    updateGuildRolePositions(guildId: string, data: Array<{
        id: string;
        position?: number | null;
    }>): Promise<Array<import("@amanda/discordtypings").RoleData>>;
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
    updateGuildRole(guildId: string, roleId: string, data: RoleOptions): Promise<import("@amanda/discordtypings").RoleData>;
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
    removeGuildRole(guildId: string, roleId: string): Promise<void>;
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
    getGuildPruneCount(guildId: string, data: {
        days?: number;
        include_roles?: string;
    }): Promise<{
        pruned: number;
    }>;
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
    startGuildPrune(guildId: string, data: {
        days?: number;
        compute_prune_count?: boolean;
        include_roles?: Array<string>;
        reason?: string;
    }): Promise<{
        pruned: number;
    }>;
    /**
     * Get a list of voice regions for the guild, includes vip-regions unlike voice.getVoiceRegions
     * @param guildId Id of the guild
     * @returns List of [voice regions](https://discord.com/developers/docs/resources/voice#voice-region-object)
     */
    getGuildVoiceRegions(guildId: string): Promise<Array<any>>;
    /**
     * Get invites for a guild
     * @param guildId Id of the guild
     * @returns List of [invites](https://discord.com/developers/docs/resources/invite#invite-object) (with metadata)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    getGuildInvites(guildId: string): Promise<Array<any>>;
    /**
     * Get integrations for a guild
     * @param guildId Id of the guild
     * @returns List of [integration objects](https://discord.com/developers/docs/resources/guild#integration-object)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    getGuildIntegrations(guildId: string): Promise<Array<any>>;
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
    createGuildIntegration(guildId: string, data: {
        type: string;
        id: string;
    }): Promise<void>;
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
    updateGuildIntegration(guildId: string, integrationId: string, data: {
        expire_behavior: number;
        expire_grace_period: number;
        enable_emoticons: boolean;
    }): Promise<void>;
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
    removeGuildIntegration(guildId: string, integrationId: string): Promise<void>;
    /**
     * Gets a guild widget object
     * @param guildId Id of the guild
     * @returns [Guild Widget](https://discord.com/developers/docs/resources/guild#guild-widget-object)
     */
    getGuildWidget(guildId: string): Promise<import("@amanda/discordtypings").GuildWidgetData>;
    /**
     * Get a guild widget settings object
     * @param guildId Id of the guild
     * @returns [Guild Widget](https://discord.com/developers/docs/resources/guild#guild-widget-object)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    getGuildWidgetSettings(guildId: string): Promise<{
        enabled: boolean;
        channel_id: string;
    }>;
    /**
     * Update a guild widget settings object
     * @param guildId Id of the guild
     * @param data basic data of widget settings
     * @returns [Guild Widget](https://discord.com/developers/docs/resources/guild#guild-widget-object)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    updateGuildWidgetSettings(guildId: string, data: {
        enabled?: boolean;
        channel_id?: string;
    }): Promise<{
        enabled: boolean;
        channel_id: string;
    }>;
    /**
     * Get a guild's vanity URL code
     * @param guildId Id of the guild
     * @returns partial [invite object](https://discord.com/developers/docs/resources/guild#get-guild-vanity-url-example-partial-invite-object)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    getGuildVanityURL(guildId: string): Promise<{
        code: string | null;
        uses: number;
    }>;
    /**
     * Get a guild's welcome screen object
     * @param guildId Id of the guild
     * @returns [Guild Welcome Screen](https://discord.com/developers/docs/resources/guild#welcome-screen-object)
     */
    getGuildWelcomeScreen(guildId: string): Promise<import("@amanda/discordtypings").WelcomeScreenData>;
    /**
     * Update a guild welcome screen object
     * @param guildId Id of guild
     * @param data Welcome screen data
     * @returns [Guild Welcome Screen](https://discord.com/developers/docs/resources/guild#welcome-screen-object)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    editGuildWelcomeScreen(guildId: string, data: Partial<import("@amanda/discordtypings").WelcomeScreenData> & {
        enabled?: boolean;
    }): Promise<any>;
    /**
     * Updates the current user's voice state in a stage channel
     * @param guildId Id of the guild
     * @param data Data of the voice state
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition                           |
     * |--------------------|-------------------------------------|
     * | MUTE_MEMBERS       | when trying to un-suppress yourself |
     * | REQUEST_TO_SPEAK   | when trying to request to speak     |
     */
    updateCurrentUserVoiceState(guildId: string, data: {
        channel_id: string;
        suppress?: boolean;
        request_to_speak_timestamp: string | null;
    }): Promise<void>;
    /**
     * Updates a user's voice state in a stage channel
     * @param guildId Id of the guild
     * @param data Data of the voice state
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition                           |
     * |--------------------|-------------------------------------|
     * | MUTE_MEMBERS       | when trying to suppress/un-suppress |
     */
    updateUserVoiceState(guildId: string, userId: string, data: {
        channel_id: string;
        suppress?: boolean;
    }): Promise<void>;
}
interface CreateGuildData {
    /**
     * name of the guild
     */
    name: string;
    /**
     * base64 encoded jpeg icon to use for the guild
     */
    icon?: string;
    /**
     * guild [verification level](https://discord.com/developers/docs/resources/guild#guild-object-verification-level)
     */
    verification_level?: 0 | 1 | 2 | 3 | 4;
    /**
     * default message [notification setting](https://discord.com/developers/docs/resources/guild#default-message-notification-level)
     */
    default_message_notifications?: 0 | 1;
    /**
     * array of [channels](https://discord.com/developers/docs/resources/channel#channel-object-channel-structure)
     */
    channels?: Array<Partial<Exclude<import("@amanda/discordtypings").GuildChannelData, "id">>>;
    /**
     * array of [roles](https://discord.com/developers/docs/resources/channel#channel-object-channel-structure)
     */
    roles?: Array<Partial<Exclude<import("@amanda/discordtypings").RoleData, "id">>>;
    afk_channel_id?: string;
    /**
     * afk timeout in seconds
     */
    afk_timeout?: number;
    system_channel_id?: string;
    system_channel_flags?: number;
}
interface UpdateGuildData {
    /**
     * name of the guild
     */
    name?: string;
    /**
     * guild [verification level](https://discord.com/developers/docs/resources/guild#guild-object-verification-level)
     */
    verification_level?: number;
    /**
     * message [notification setting](https://discord.com/developers/docs/resources/guild#default-message-notification-level)
     */
    default_message_notifications?: number;
    /**
     * Id of the afk channel
     */
    afk_channel_id?: string;
    /**
     * afk timeout in seconds
     */
    afk_timeout?: number;
    /**
     * base64 jpeg image of the guild icon
     */
    icon?: string;
    /**
     * Id of the owner user
     */
    owner_id?: string;
    /**
     * base64 jpeg image for the guild splash (vip/partner only)
     */
    splash?: string;
}
interface CreateGuildChannelData {
    /**
     * name of the channel
     */
    name: string;
    /**
     * [type](https://discord.com/developers/docs/resources/channel#channel-object-channel-types) of the channel
     */
    type?: number;
    topic?: string;
    /**
     * bitrate of the channel (voice only)
     */
    bitrate?: number;
    /**
     * user limit of a channel (voice only)
     */
    user_limit?: number;
    rate_limit_per_user?: number;
    position?: number;
    /**
     * permissions overwrites for the channel
     */
    permission_overwrites?: Array<any>;
    parent_id?: string;
    nsfw?: boolean;
}
interface AddGuildMemberData {
    /**
     * oauth2 access token with a `guilds.join` scope enabled
     */
    access_token: string;
    /**
     * nickname of the new member
     */
    nick?: string;
    /**
     * Array of Role Ids the new member should have
     */
    roles?: Array<string>;
    /**
     * if the new member should be muted
     */
    mute?: boolean;
    /**
     * if the new member is deaf
     */
    deaf?: boolean;
}
interface UpdateGuildMemberData {
    nick?: string;
    roles?: Array<string>;
    mute?: boolean;
    deaf?: boolean;
    channel_id?: string | null;
}
interface GetGuildMembersData {
    limit?: number;
    after?: string;
}
interface RoleOptions {
    name?: string;
    permissions?: number;
    color?: number;
    hoist?: boolean;
    mentionable?: boolean;
}
export = GuildMethods;
