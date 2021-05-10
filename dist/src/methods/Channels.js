"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Endpoints_1 = __importDefault(require("../Endpoints"));
const Constants_1 = __importDefault(require("../Constants"));
/**
 * Methods for interacting with Channels and Messages
 */
class ChannelMethods {
    /**
     * Create a new Channel Method handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.channel.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler request handler that calls the rest api
     * @param disableEveryone Disable [at]everyone/[at]here on outgoing messages
     */
    constructor(requestHandler, disableEveryone) {
        this.requestHandler = requestHandler;
        this.disableEveryone = disableEveryone;
    }
    /**
     * Get a channel via Id
     * @param channelId Id of the channel
     * @returns [discord channel](https://discord.com/developers/docs/resources/channel#channel-object) object
     *
     * @example
     * let client = new SnowTransfer('TOKEN')
     * let channel = await client.channel.getChannel('channel id')
     */
    async getChannel(channelId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL(channelId), "get", "json");
    }
    /**
     * Update a channel
     * @param channelId Id of the channel
     * @param data Data to send
     * @returns [discord channel](https://discord.com/developers/docs/resources/channel#channel-object) object
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_CHANNELS    | always    |
     *
     * @example
     * // This example updates a channel with the passed id to use "New Name" as it's name and "Look at this cool topic" as the topic
     * let client = new SnowTransfer('TOKEN')
     * let updateData = {
     *   name: 'New Name',
     *   topic: 'Look at this cool topic'
     * }
     * client.channel.updateChannel('channel id', updateData)
     */
    async updateChannel(channelId, data) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL(channelId), "patch", "json", data);
    }
    /**
     * Delete a channel via Id
     *
     * This either **deletes** a Guild Channel or **closes** a Direct Message Channel
     *
     * **Be careful with deleting Guild Channels as this can not be undone!**
     *
     * When deleting a category, this does **not** delete the child channels of a category. They will just have their `parent_id` removed.
     * @param channelId - Id of the channel
     * @returns [discord channel](https://discord.com/developers/docs/resources/channel#channel-object) object
     *
     * | Permissions needed | Condition                        |
     * |--------------------|----------------------------------|
     * | MANAGE_CHANNELS    | When deleting a Guild Channel    |
     */
    async deleteChannel(channelId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL(channelId), "delete", "json");
    }
    /**
     * Get a list of messages from a channel
     * @param channelId Id of the channel
     * @returns Array of [discord message](https://discord.com/developers/docs/resources/channel#message-object) objects
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | READ_MESSAGES      | always    |
     *
     * @example
     * // Fetch the last 20 messages from a channel
     * let client = new SnowTransfer('TOKEN')
     * let options = {
     *   limit: 20
     * }
     * let messages = await client.channel.getChannelMessages('channel id', options);
     */
    async getChannelMessages(channelId, options = { limit: 50 }) {
        if (options.around) {
            delete options.before;
            delete options.after;
        }
        else if (options.before) {
            delete options.around;
            delete options.after;
        }
        else if (options.after) {
            delete options.before;
            delete options.around;
        }
        if (options.limit && options.limit > Constants_1.default.GET_CHANNEL_MESSAGES_MAX_RESULTS) {
            throw new Error(`The maximum amount of messages that may be requested is ${Constants_1.default.GET_CHANNEL_MESSAGES_MAX_RESULTS}`);
        }
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_MESSAGES(channelId), "get", "json", options);
    }
    /**
     * Get a single message via Id
     * @param channelId Id of the channel
     * @param messageId Id of the message
     * @returns [discord message](https://discord.com/developers/docs/resources/channel#message-object) object
     *
     * | Permissions needed   | Condition |
     * |----------------------|-----------|
     * | READ_MESSAGE_HISTORY | always    |
     *
     * @example
     * // Get a single message from a channel via id
     * let client = new SnowTransfer('TOKEN')
     * let message = await client.channel.getChannelMessage('channel id', 'message id')
     */
    async getChannelMessage(channelId, messageId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_MESSAGE(channelId, messageId), "get", "json");
    }
    /**
     * Creates a new Message within a channel
     *
     * **Make sure to use a filename with a proper extension (e.g. png, jpeg, etc.) when you want to upload files**
     * @param channelId Id of the Channel to sent a message to
     * @param data Data to send, if data is a string it will be used as the content of the message,
     * if data is not a string you should take a look at the properties below to know what you may send
     * @returns [discord message](https://discord.com/developers/docs/resources/channel#message-object) object
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | SEND_MESSAGES      | always    |
     *
     * @example
     * // Make a bot say "hi" within a channel
     * // createMessage sends the passed data as content, when you give it a string
     * let client = new SnowTransfer('TOKEN')
     * client.channel.createMessage('channel id', 'hi')
     *
     * @example
     * // Send a rich embed object
     * let client = new SnowTransfer('TOKEN')
     * let embedData = {
     *   title: 'This is a nice embed',
     *   description: 'But winter is so cold',
     *   fields: [
     *       {name: 'Brr', value: 'Insert snowflake emoji here'}
     *     ]
     * }
     * client.channel.createMessage('channel id', {embed: embedData})
     *
     * @example
     * // Send a file with a comment
     * let client = new SnowTransfer('TOKEN')
     * // fileData will be a buffer with the data of the png image.
     * let fileData = fs.readFileSync('nice_picture.png') // You should probably use fs.readFile, since it's asynchronous, synchronous methods may lag your bot.
     * client.channel.createMessage('channel id', {content: 'This is a nice picture', file: {name: 'Optional Filename.png', file: fileData}})
     */
    async createMessage(channelId, data, options = { disableEveryone: this.disableEveryone }) {
        if (typeof data !== "string" && !data.content && !data.embed && !data.file) {
            throw new Error("Missing content or embed or file");
        }
        if (typeof data === "string") {
            data = { content: data };
        }
        // Sanitize the message
        if (data.content && (options.disableEveryone !== undefined ? options.disableEveryone : this.disableEveryone)) {
            data.content = data.content.replace(/@([^<>@ ]*)/gsmu, (match, target) => {
                if (target.match(/^[&!]?\d+$/)) {
                    return `@${target}`;
                }
                else {
                    return `@\u200b${target}`;
                }
            });
        }
        if (data.file) {
            return this.requestHandler.request(Endpoints_1.default.CHANNEL_MESSAGES(channelId), "post", "multipart", data);
        }
        else {
            return this.requestHandler.request(Endpoints_1.default.CHANNEL_MESSAGES(channelId), "post", "json", data);
        }
    }
    /**
     * Edit a message sent by the current user
     * @param channelId Id of the channel
     * @param messageId Id of the message
     * @param data Data to send
     * @returns [discord message](https://discord.com/developers/docs/resources/channel#message-object) object
     *
     * @example
     * // Simple ping response
     * let client = new SnowTransfer('TOKEN')
     * let time = Date.now()
     * let message = await client.channel.createMessage('channel id', 'pong')
     * client.channel.editMessage('channel id', message.id, `pong ${Date.now() - time}ms`)
     */
    async editMessage(channelId, messageId, data, options = { disableEveryone: this.disableEveryone }) {
        if (typeof data !== "string" && data.content === undefined && data.embed === undefined) {
            throw new Error("Missing content or embed");
        }
        if (typeof data === "string") {
            data = { content: data };
        }
        // Sanitize the message
        if (data.content && (options.disableEveryone !== undefined ? options.disableEveryone : this.disableEveryone)) {
            data.content = data.content.replace(/@([^<>@ ]*)/gsmu, (match, target) => {
                if (target.match(/^[&!]?\d+$/)) {
                    return `@${target}`;
                }
                else {
                    return `@\u200b${target}`;
                }
            });
        }
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_MESSAGE(channelId, messageId), "patch", "json", data);
    }
    /**
     * Delete a message
     * @param channelId Id of the channel
     * @param messageId Id of the message
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition                                    |
     * |--------------------|----------------------------------------------|
     * | MANAGE_MESSAGES    | When the bot isn't the author of the message |
     *
     * @example
     * // Delete a message
     * let client = new SnowTransfer('TOKEN')
     * client.channel.deleteMessage('channel id', 'message id')
     */
    async deleteMessage(channelId, messageId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_MESSAGE(channelId, messageId), "delete", "json");
    }
    /**
     * Bulk delete messages, messages may not be older than 2 weeks
     * @param channelId Id of the channel
     * @param messages array of message ids to delete
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_MESSAGES    | always    |
     */
    async bulkDeleteMessages(channelId, messages) {
        if (messages.length < Constants_1.default.BULK_DELETE_MESSAGES_MIN || messages.length > Constants_1.default.BULK_DELETE_MESSAGES_MAX) {
            throw new Error(`Amount of messages to be deleted has to be between ${Constants_1.default.BULK_DELETE_MESSAGES_MIN} and ${Constants_1.default.BULK_DELETE_MESSAGES_MAX}`);
        }
        // (Current date - (discord epoch + 2 weeks)) * (2**22) weird constant that everybody seems to use
        const oldestSnowflake = BigInt((Date.now() - 1421280000000) * 2 ** 22);
        const forbiddenMessage = messages.find(m => BigInt(m) < oldestSnowflake);
        if (forbiddenMessage) {
            throw new Error(`The message ${forbiddenMessage} is older than 2 weeks and may not be deleted using the bulk delete endpoint`);
        }
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_BULK_DELETE(channelId), "post", "json", { messages });
    }
    /**
     * Adds a reaction to a message
     * @param channelId Id of the channel
     * @param messageId Id of the message
     * @param emoji uri encoded reaction emoji to add,
     * you may either use a discord emoji in the format `:emoji_name:emoji_id` or a unicode emoji,
     * which can be found [here](http://www.unicode.org/emoji/charts/full-emoji-list.html)
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed   | Condition                                          |
     * |----------------------|----------------------------------------------------|
     * | READ_MESSAGE_HISTORY | always                                             |
     * | ADD_REACTIONS        | When no other user has reacted with the emoji used |
     *
     * @example
     * // This example uses a discord emoji
     * let client = new SnowTransfer('TOKEN');
     * client.channel.createReaction('channel Id', 'message Id', encodeURIComponent(':awooo:322522663304036352'));
     *
     * @example
     * // using a utf-8 emoji
     * let client = new SnowTransfer('TOKEN');
     * client.channel.createReaction('channel Id', 'message Id', encodeURIComponent('😀'));
     */
    async createReaction(channelId, messageId, emoji) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_MESSAGE_REACTION_USER(channelId, messageId, emoji, "@me"), "put", "json");
    }
    /**
     * Delete a reaction added by the current user from a message
     * @param channelId Id of the channel
     * @param messageId Id of the message
     * @param emoji reaction emoji
     * @returns Resolves the Promise on successful execution
     *
     * @example
     * // This example uses a discord emoji
     * let client = new SnowTransfer('TOKEN');
     * client.channel.deleteReactionSelf('channel Id', 'message Id', encodeURIComponent(':awooo:322522663304036352'));
     *
     * @example
     * // using a utf-8 emoji
     * let client = new SnowTransfer('TOKEN');
     * client.channel.deleteReactionSelf('channel Id', 'message Id', encodeURIComponent('😀'));
     */
    async deleteReactionSelf(channelId, messageId, emoji) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_MESSAGE_REACTION_USER(channelId, messageId, emoji, "@me"), "delete", "json");
    }
    /**
     * Delete a reaction from a message
     * @param channelId Id of the channel
     * @param messageId Id of the message
     * @param emoji reaction emoji
     * @param userId Id of the user
     * @returns Resolves the Promise on successful execution
     *
     * | Permission        | Condition |
     * |-------------------|-----------|
     * | MANAGE_MESSAGES   | always    |
     *
     * @example
     * // This example uses a discord emoji
     * let client = new SnowTransfer('TOKEN');
     * client.channel.deleteReaction('channel Id', 'message Id', encodeURIComponent(':awooo:322522663304036352'), 'user Id');
     *
     * @example
     * // using a utf-8 emoji
     * let client = new SnowTransfer('TOKEN');
     * client.channel.deleteReaction('channel Id', 'message Id', encodeURIComponent('😀'), 'user Id');
     */
    async deleteReaction(channelId, messageId, emoji, userId) {
        if (!userId)
            return this.requestHandler.request(Endpoints_1.default.CHANNEL_MESSAGE_REACTION(channelId, messageId, emoji), "delete", "json");
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_MESSAGE_REACTION_USER(channelId, messageId, emoji, userId), "delete", "json");
    }
    /**
     * Get a list of users that reacted with a certain emoji on a certain message
     * @param channelId Id of the channel
     * @param messageId Id of the message
     * @param emoji reaction emoji
     * @returns Array of [user objects](https://discord.com/developers/docs/resources/user#user-object)
     *
     * @example
     * // This example uses a discord emoji
     * let client = new SnowTransfer('TOKEN');
     * let reactions = await client.channel.getReactions('channel Id', 'message Id', encodeURIComponent(':awooo:322522663304036352'));
     */
    async getReactions(channelId, messageId, emoji) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_MESSAGE_REACTION(channelId, messageId, emoji), "get", "json");
    }
    /**
     * Delete all reactions from a message
     * @param channelId Id of the channel
     * @param messageId Id of the message
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_MESSAGES    | always    |
     */
    async deleteAllReactions(channelId, messageId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_MESSAGE_REACTIONS(channelId, messageId), "delete", "json");
    }
    /**
     * Modify the permission overwrites of a channel
     * @param channelId Id of the channel
     * @param permissionId Id of the permission overwrite
     * @param data modified [permission overwrite](https://discord.com/developers/docs/resources/channel#edit-channel-permissions-json-params) object
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_ROLES       | always    |
     */
    async editChannelPermission(channelId, permissionId, data) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_PERMISSION(channelId, permissionId), "put", "json", data);
    }
    /**
     * Delete a permission overwrite from a channel
     * @param channelId Id of the channel
     * @param permissionId Id of the permission overwrite
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_ROLES       | always    |
     */
    async deleteChannelPermission(channelId, permissionId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_PERMISSION(channelId, permissionId), "delete", "json");
    }
    /**
     * Get a list of invites for a channel
     * @param channelId Id of the channel
     * @returns Array of [invite objects](https://discord.com/developers/docs/resources/invite#invite-object) (with metadata)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_CHANNELS    | always    |
     */
    async getChannelInvites(channelId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_INVITES(channelId), "get", "json");
    }
    /**
     * Create an invite for a channel
     *
     * If no data argument is passed, the invite will be created with the defaults listed below
     * @param channelId - Id of the channel
     * @param data invite data (optional)
     * @returns [Invite object](https://discord.com/developers/docs/resources/invite#invite-object) (with metadata)
     *
     * | Permissions needed    | Condition |
     * |-----------------------|-----------|
     * | CREATE_INSTANT_INVITE | always    |
     */
    async createChannelInvite(channelId, data = { max_age: 86400, max_uses: 0, temporary: false, unique: false }) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_INVITES(channelId), "post", "json", data);
    }
    /**
     * Send an indicator that the current user is typing within a channel.
     *
     * **You should generally avoid this method unless used for longer computations (>1s)**
     * @param channelId Id of the channel
     * @returns Resolves the Promise on successful execution
     */
    async startChannelTyping(channelId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_TYPING(channelId), "post", "json");
    }
    /**
     * Get a list of pinned messages for a channel
     * @param channelId Id of the channel
     * @returns Array of [message objects](https://discord.com/developers/docs/resources/channel#message-object)
     */
    async getChannelPinnedMessages(channelId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_PINS(channelId), "get", "json");
    }
    /**
     * Pin a message within a channel
     * @param channelId Id of the channel
     * @param messageId Id of the message
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_MESSAGES    | always    |
     */
    async addChannelPinnedMessage(channelId, messageId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_PIN(channelId, messageId), "put", "json");
    }
    /**
     * Remove a pinned message from a channel
     * @param channelId - Id of the channel
     * @param messageId - Id of the message
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_MESSAGES    | always    |
     */
    async removeChannelPinnedMessage(channelId, messageId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_PIN(channelId, messageId), "delete", "json");
    }
    /**
     * Add a user to a group dm
     * @param channelId Id of the channel
     * @param userId Id of the user to be removed
     * @param data Data to send to this endpoint
     * @param data.access_token access token of the user that granted the app the gdm.join scope
     * @param data.nick nickname of the user being added
     * @returns Resolves the Promise on successful execution
     *
     * | OAUTH2 Scopes |
     * |---------------|
     * | gdm.join      |
     */
    async addDmChannelRecipient(channelId, userId, data) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_RECIPIENT(channelId, userId), "put", "json", data);
    }
    /**
     * Remove a recipient from a group dm
     * @param channelId Id of the channel
     * @param userId Id of the user to be removed
     * @returns Resolves the Promise on successful execution
     */
    async removeDmChannelRecipient(channelId, userId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_RECIPIENT(channelId, userId), "delete", "json");
    }
    async getChannelThreadMembers(channelId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_THREAD_MEMBERS(channelId), "get", "json");
    }
    async getChannelActiveThreads(channelId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_THREADS_ACTIVE(channelId), "get", "json");
    }
    async getChannelArchivedPrivateThreads(channelId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_THREADS_ARCHIVED_PRIVATE(channelId), "get", "json");
    }
    async getChannelArchivedPrivateThreadsUser(channelId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_THREADS_ARCHIVED_PRIVATE_USER(channelId), "get", "json");
    }
    async getChannelArchivedPublicThreads(channelId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_THREADS_ARCHIVED_PUBLIC(channelId), "get", "json");
    }
}
module.exports = ChannelMethods;
// Wolke >>
// https://www.youtube.com/watch?v=LIlZCmETvsY have a weird video to distract yourself from the problems that will come upon ya
// PapiOphidian >>
// Thanks, Wolke :)
