import UserCache from "../cache/UserCache";
/**
 * Methods for interacting with users
 */
declare class UserMethods {
    requestHandler: import("../RequestHandler");
    cache: UserCache;
    /**
     * Create a new User Method handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.user.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler
     */
    constructor(requestHandler: import("../RequestHandler"));
    /**
     * Get information about current user
     * @returns [user object](https://discord.com/developers/docs/resources/user#user-object)
     */
    getSelf(): Promise<Required<import("@amanda/discordtypings").UserData>>;
    /**
     * Get information about a user via Id
     * @param userId Id of the user
     * @returns [user object](https://discord.com/developers/docs/resources/user#user-object)
     */
    getUser(userId: string): Promise<import("@amanda/discordtypings").UserData>;
    /**
     * Update the current user
     * @returns [user object](https://discord.com/developers/docs/resources/user#user-object)
     *
     * @example
     * // update the avatar of the user
     * let client = new SnowTransfer('TOKEN');
     * let fileData = fs.readFileSync('new_avatar.png') // You should probably use fs.readFile, since it's asynchronous, synchronous methods may lag your bot.
     * let updateData = {
     *   avatar: `data:image/png;base64,${fileData.toString('base64')}` // base64 data url: data:mimetype;base64,base64String
     * }
     * client.user.updateSelf(updateData)
     */
    updateSelf(data: {
        username?: string;
        avatar?: string;
    }): Promise<Required<import("@amanda/discordtypings").UserData>>;
    /**
     * Get guilds of the current user
     * @returns Array of [partial guild objects](https://discord.com/developers/docs/resources/guild#guild-object)
     */
    getGuilds(): Promise<Array<import("@amanda/discordtypings").GuildData>>;
    /**
     * Leave a guild
     * @param guildId Id of the guild
     * @returns Resolves the Promise on successful execution
     */
    leaveGuild(guildId: string): Promise<void>;
    /**
     * Get direct messages of a user
     *
     * **Returns an empty array for bots**
     * @returns Array of [dm channels](https://discord.com/developers/docs/resources/channel#channel-object)
     */
    getDirectMessages(): Promise<Array<import("@amanda/discordtypings").DMChannelData>>;
    /**
     * Create a direct message channel with another user
     *
     * **You can not create a dm with another bot**
     * @param userId Id of the user to create the direct message channel with
     * @returns [DM channel](https://discord.com/developers/docs/resources/channel#channel-object)
     *
     * @example
     * // Create a dm channel and send "hi" to it
     * let client = new SnowTransfer('TOKEN');
     * let channel = await client.user.createDirectMessageChannel('other user id')
     * client.channel.createMessage(channel.id, 'hi')
     */
    createDirectMessageChannel(userId: string): Promise<import("@amanda/discordtypings").DMChannelData>;
}
export = UserMethods;
