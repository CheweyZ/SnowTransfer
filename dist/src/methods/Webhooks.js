"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Endpoints_1 = __importDefault(require("../Endpoints"));
/**
 * Methods for handling webhook interactiong
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
     * client.webhook.createWebhook('channel Id', webhookData)
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
    /**
     * Send a message via Webhook
     * @param webhookId Id of the webhook
     * @param token webhook token
     * @param data Webhook data to send
     * @returns Resolves the Promise on successful execution
     *
     * @example
     * // Send a message saying "Hi from my webhook" with a previously created webhook
     * let client = new SnowTransfer('TOKEN');
     * client.webhook.executeWebhook('webhook Id', 'webhook token', {content: 'Hi from my webhook'})
     */
    async executeWebhook(webhookId, token, data = {}, options = { disableEveryone: this.disableEveryone }) {
        if (typeof data !== "string" && !data.content && !data.embeds && !data.file) {
            throw new Error("Missing content or embeds");
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
        if (data.file)
            return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN(webhookId, token), "post", "multipart", data);
        else
            return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN(webhookId, token), "post", "json", data);
    }
    /**
     * Execute a slack style Webhook
     * @param webhookId Id of the Webhook
     * @param token Webhook token
     * @param data Check [Slack's documentation](https://api.slack.com/incoming-webhooks)
     * @returns Resolves the Promise on successful execution
     */
    async executeWebhookSlack(webhookId, token, data, options = { disableEveryone: this.disableEveryone }) {
        // Sanitize the message
        if (data.text && (options.disableEveryone !== undefined ? options.disableEveryone : this.disableEveryone)) {
            data.text = data.text.replace(/@([^<>@ ]*)/gsmu, (match, target) => {
                if (target.match(/^[&!]?\d+$/)) {
                    return `@${target}`;
                }
                else {
                    return `@\u200b${target}`;
                }
            });
        }
        return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN_SLACK(webhookId, token), "post", "json", data);
    }
}
module.exports = WebhookMethods;
