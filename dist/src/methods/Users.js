"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Endpoints_1 = __importDefault(require("../Endpoints"));
const UserCache_1 = __importDefault(require("../cache/UserCache"));
/**
 * Methods for interacting with users
 */
class UserMethods {
    /**
     * Create a new User Method handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.user.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler
     */
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
        this.cache = new UserCache_1.default(this);
    }
    /**
     * Get information about current user
     * @returns [user object](https://discord.com/developers/docs/resources/user#user-object)
     */
    async getSelf() {
        return this.cache.wrap("@me", this.requestHandler.request(Endpoints_1.default.USER("@me"), "get", "json"));
    }
    /**
     * Get information about a user via Id
     * @param userId Id of the user
     * @returns [user object](https://discord.com/developers/docs/resources/user#user-object)
     */
    async getUser(userId) {
        return this.cache.wrap(userId, this.requestHandler.request(Endpoints_1.default.USER(userId), "get", "json"));
    }
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
    async updateSelf(data) {
        return this.cache.wrap("@me", this.requestHandler.request(Endpoints_1.default.USER("@me"), "patch", "json", data));
    }
    /**
     * Get guilds of the current user
     * @returns Array of [partial guild objects](https://discord.com/developers/docs/resources/guild#guild-object)
     */
    async getGuilds() {
        return this.requestHandler.request(Endpoints_1.default.USER_GUILDS("@me"), "get", "json");
    }
    /**
     * Leave a guild
     * @param guildId Id of the guild
     * @returns Resolves the Promise on successful execution
     */
    async leaveGuild(guildId) {
        return this.requestHandler.request(Endpoints_1.default.USER_GUILD("@me", guildId), "delete", "json");
    }
    /**
     * Get direct messages of a user
     *
     * **Returns an empty array for bots**
     * @returns Array of [dm channels](https://discord.com/developers/docs/resources/channel#channel-object)
     */
    async getDirectMessages() {
        return this.requestHandler.request(Endpoints_1.default.USER_CHANNELS("@me"), "get", "json");
    }
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
    async createDirectMessageChannel(userId) {
        return this.requestHandler.request(Endpoints_1.default.USER_CHANNELS("@me"), "post", "json", { recipient_id: userId });
    }
}
module.exports = UserMethods;
