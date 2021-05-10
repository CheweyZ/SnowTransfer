"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Endpoints_1 = __importDefault(require("../Endpoints"));
/**
 * Methods for interacting with emojis
 */
class EmojiMethods {
    /**
     * Create a new Emoji Method handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.emoji.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler request handler that calls the rest api
     */
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
     * Get a list of emojis of a guild
     * @param guildId Id of the guild
     * @returns Array of [emoji objects](https://discord.com/developers/docs/resources/emoji#emoji-object)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_EMOJIS      | always    |
     */
    async getEmojis(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_EMOJIS(guildId), "get", "json");
    }
    /**
     * Get an emoji via guildId + emojiId
     * @param guildId Id of the guild
     * @param emojiId Id of the emoji
     * @returns [Emoji object](https://discord.com/developers/docs/resources/emoji#emoji-object)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_EMOJIS      | always    |
     */
    async getEmoji(guildId, emojiId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_EMOJI(guildId, emojiId), "get", "json");
    }
    /**
     * Create a new Emoji
     * @param guildId Id of the guild
     * @param data Emoji data, check the example
     * @returns [Emoji object](https://discord.com/developers/docs/resources/emoji#emoji-object)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_EMOJIS      | always    |
     *
     * @example
     * // upload a simple png emoji with a name of "niceEmoji"
     * let client = new SnowTransfer('TOKEN');
     * let fileData = fs.readFileSync('nice_emoji.png') // You should probably use fs.readFile, since it's asynchronous, synchronous methods may lag your bot.
     * let emojiData = {
     *   name: 'niceEmoji',
     *   image: `data:image/png;base64,${fileData.toString('base64')}` // base64 data url: data:mimetype;base64,base64String
     * }
     * client.emoji.createEmoji('guild id', emojiData)
     */
    async createEmoji(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_EMOJIS(guildId), "post", "json", data);
    }
    /**
     * Update an existing emoji
     * @param {string} guildId - Id of the guild
     * @param {string} emojiId - Id of the emoji
     * @param {object} data - Emoji data, check the example
     * @param {string} data.name - new name of the emoji
     * @returns [Emoji object](https://discord.com/developers/docs/resources/emoji#emoji-object)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_EMOJIS      | always    |
     *
     * @example
     * // Change the name of an existing emoji to "niceEmote"
     * let client = new SnowTransfer('TOKEN');
     * let emojiData = {
     *   name: 'niceEmote'
     * }
     * client.emoji.updateEmoji('guild id', 'emoji id', emojiData)
     */
    async updateEmoji(guildId, emojiId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_EMOJI(guildId, emojiId), "patch", "json", data);
    }
    /**
     * Delete an emoji
     * @param guildId Id of the guild
     * @param emojiId Id of the emoji
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_EMOJIS      | always    |
     */
    async deleteEmoji(guildId, emojiId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_EMOJI(guildId, emojiId), "delete");
    }
}
module.exports = EmojiMethods;
