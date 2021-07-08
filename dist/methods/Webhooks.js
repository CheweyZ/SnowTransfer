"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Endpoints_1 = __importDefault(require("../Endpoints"));
/**
 * Methods for handling webhook interactions
 */
class WebhookMethods {
    /**
     * Create a new Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.webhook.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler request handler that calls the rest api
     * @param disableEveryone Disable [at]everyone/[at]here on outgoing messages
     */
    constructor(requestHandler, disableEveryone) {
        this.requestHandler = requestHandler;
        this.disableEveryone = disableEveryone;
    }
    /**
     * Create a new Webhook
     * @param channelId - Id of the channel
     * @param data Object with webhook properties
     * @returns [Webhook Object](https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_WEBHOOKS    | always    |
     *
     * @example
     * // Create a new Webhook with the name "Webby Webhook"
     * let client = new SnowTransfer('TOKEN');
     * let webhookData = {
     *   name: "Webby Webhook"
     * }
     * client.webhook.createWebhook('channel Id', webhookData);
     */
    async createWebhook(channelId, data) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_WEBHOOKS(channelId), "post", "json", data);
    }
    /**
     * Get webhooks created within a channel
     * @param channelId - Id of the channel
     * @returns Array of [Webhook Objects](https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_WEBHOOKS    | always    |
     *
     * @example
     * // Get all webhooks within a channel
     * let client = new SnowTransfer('TOKEN');
     * client.webhook.getWebhooksChannel('channel Id').then(console.log);
     */
    async getWebhooksChannel(channelId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_WEBHOOKS(channelId), "get", "json");
    }
    /**
     * Get all webhooks within a guild
     * @param guildId Id of the guild
     * @returns Array of [Webhook Objects](https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_WEBHOOKS    | always    |
     *
     * @example
     * // Get all webhooks within a guild
     * let client = new SnowTransfer('TOKEN');
     * client.webhook.getWebhooksGuild('guild Id').then(console.log);
     */
    async getWebhooksGuild(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_WEBHOOKS(guildId), "get", "json");
    }
    /**
     * Get a single Webhook via Id
     * @param webhookId Id of the webhook
     * @param token Webhook token
     * @returns [Webhook Object](https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | Condition     |
     * |--------------------|---------------|
     * | MANAGE_WEBHOOKS    | without token |
     *
     * @example
     * // Get a webhook via Id
     * let client = new SnowTransfer('TOKEN');
     * client.webhook.getWebhook('webhook Id', 'webhook token').then(console.log);
     */
    async getWebhook(webhookId, token) {
        if (token)
            return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN(webhookId, token), "get", "json");
        return this.requestHandler.request(Endpoints_1.default.WEBHOOK(webhookId), "get", "json");
    }
    /**
     * Update a webhook
     * @param webhookId Id of the webhook
     * @param token Webhook token
     * @param data Updated Webhook properties
     * @returns Updated [Webhook Object](https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | Condition     |
     * |--------------------|---------------|
     * | MANAGE_WEBHOOKS    | without token |
     *
     * @example
     * // Rename a webhook to "Captain Hook"
     * let client = new SnowTransfer('TOKEN');
     * let webhookData = {
     *   name: 'Captain Hook'
     * }
     * client.webhook.updateWebhook('webhook Id', 'webhook token', webhookData);
     */
    async updateWebhook(webhookId, token, data) {
        if (token)
            return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN(webhookId, token), "patch", "json", data);
        return this.requestHandler.request(Endpoints_1.default.WEBHOOK(webhookId), "patch", "json", data);
    }
    /**
     * Delete a Webhook
     * @param webhookId Id of the webhook
     * @param token Webhook token
     * @returns Resolves the Promise on successful execution
     *
     * | Permissions needed | Condition     |
     * |--------------------|---------------|
     * | MANAGE_WEBHOOKS    | without token |
     */
    async deleteWebhook(webhookId, token) {
        if (token)
            return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN(webhookId, token), "delete", "json");
        return this.requestHandler.request(Endpoints_1.default.WEBHOOK(webhookId), "delete", "json");
    }
    async executeWebhook(webhookId, token, data, options = { wait: false, disableEveryone: this.disableEveryone }) {
        if (typeof data !== "string" && !(data === null || data === void 0 ? void 0 : data.content) && !(data === null || data === void 0 ? void 0 : data.embeds) && !(data === null || data === void 0 ? void 0 : data.files)) {
            throw new Error("Missing content or embeds or files");
        }
        if (typeof data === "string") {
            data = { content: data };
        }
        // Sanitize the message
        if (data.content && ((options === null || options === void 0 ? void 0 : options.disableEveryone) !== undefined ? options.disableEveryone : this.disableEveryone)) {
            data.content = data.content.replace(/@([^<>@ ]*)/gsmu, replaceEveryone);
        }
        if (data.files)
            return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN(webhookId, token) + (options === null || options === void 0 ? void 0 : options.wait) ? "?wait=true" : "", "post", "multipart", data);
        else
            return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN(webhookId, token) + (options === null || options === void 0 ? void 0 : options.wait) ? "?wait=true" : "", "post", "json", data);
    }
    /**
     * Execute a slack style Webhook
     * @param webhookId Id of the Webhook
     * @param token Webhook token
     * @param data Check [Slack's documentation](https://api.slack.com/incoming-webhooks)
     * @param options Options for disabling everyone/here pings or setting the wait query string
     * @returns Resolves the Promise on successful execution
     */
    async executeWebhookSlack(webhookId, token, data, options = { wait: false, disableEveryone: this.disableEveryone }) {
        // Sanitize the message
        if (data.text && ((options === null || options === void 0 ? void 0 : options.disableEveryone) !== undefined ? options.disableEveryone : this.disableEveryone)) {
            data.text = data.text.replace(/@([^<>@ ]*)/gsmu, replaceEveryone);
        }
        return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN_SLACK(webhookId, token) + (options === null || options === void 0 ? void 0 : options.wait) ? "?wait=true" : "", "post", "json", data);
    }
    /**
     * Executes a github style Webhook
     * @param webhookId Id of the Webhook
     * @param token Webhook token
     * @param data Check [GitHub's documentation](https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads#webhook-payload-object)
     * @param options Options for disabling everyone/here pings or setting the wait query string
     * @returns Resolves the Promise on successful execution
     */
    async executeWebhookGitHub(webhookId, token, data, options = { wait: false }) {
        return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN_GITHUB(webhookId, token) + (options === null || options === void 0 ? void 0 : options.wait) ? "?wait=true" : "", "post", "json", data);
    }
    /**
     * Get a single message from a specific Webhook via Id
     * @param webhookId Id of the Webhook
     * @param token Webhook token
     * @param messageId Id of the message
     * @returns [discord message](https://discord.com/developers/docs/resources/channel#message-object) object
     */
    async getWebhookMessage(webhookId, token, messageId) {
        return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN_MESSAGE(webhookId, token, messageId), "get", "json");
    }
    /**
     * Edit a message sent by a Webhook
     * @param webhookId Id of the Webhook
     * @param token Webhook token
     * @param messageId Id of the message
     * @param data Data to send
     * @returns [discord message](https://discord.com/developers/docs/resources/channel#message-object) object
     */
    async editWebhookMessage(webhookId, token, messageId, data) {
        if (data.files)
            return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN_MESSAGE(webhookId, token, messageId), "patch", "multipart", data);
        else
            return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN_MESSAGE(webhookId, token, messageId), "patch", "json", data);
    }
    /**
     * Delete a message sent by a Webhook
     * @param webhookId Id of the Webhook
     * @param token Webhook token
     * @param messageId Id of the message
     * @returns Resolves the Promise on successful execution
     */
    async deleteWebhookMessage(webhookId, token, messageId) {
        return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN_MESSAGE(webhookId, token, messageId), "delete", "json");
    }
}
function replaceEveryone(match, target) {
    if (target.match(/^[&!]?\d+$/)) {
        return `@${target}`;
    }
    else {
        return `@\u200b${target}`;
    }
}
module.exports = WebhookMethods;
