/**
 * Methods for interacting with emojis
 */
declare class EmojiMethods {
    requestHandler: import("../RequestHandler");
    /**
     * Create a new Emoji Method handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.emoji.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler request handler that calls the rest api
     */
    constructor(requestHandler: import("../RequestHandler"));
    /**
     * Get a list of emojis of a guild
     * @param guildId Id of the guild
     * @returns Array of [emoji objects](https://discord.com/developers/docs/resources/emoji#emoji-object)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_EMOJIS      | always    |
     */
    getEmojis(guildId: string): Promise<Array<import("@amanda/discordtypings").EmojiData>>;
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
    getEmoji(guildId: string, emojiId: string): Promise<import("@amanda/discordtypings").EmojiData>;
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
    createEmoji(guildId: string, data: CreateEmojiData): Promise<import("@amanda/discordtypings").EmojiData>;
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
    updateEmoji(guildId: string, emojiId: string, data: {
        name: string;
    }): Promise<import("@amanda/discordtypings").EmojiData>;
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
    deleteEmoji(guildId: string, emojiId: string): Promise<void>;
}
interface CreateEmojiData {
    /**
     * name of the emoji
     */
    name: string;
    /**
     * base 64 avatar
     */
    image: string;
}
/**
 * @typedef {object} Emoji
 * @property {string} id - Id of the emoji
 * @property {string} name - name of the emoji
 * @property {Array} [roles] - array of roles whitelisted to use the emoji (whitelisted apps only)
 * @property {import("./Users").User} [user] - User that created this emoji
 * @property {Boolean} require_colons - whether this emoji must be wrapped in colons
 * @property {Boolean} managed - whether this emoji is managed
 */
export = EmojiMethods;
