/// <reference types="node" />
/**
 * Methods for handling webhook interactiong
 */
declare class WebhookMethods {
    requestHandler: import("../RequestHandler");
    disableEveryone: boolean;
    /**
     * Create a new Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.webhook.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler request handler that calls the rest api
     * @param disableEveryone Disable [at]everyone/[at]here on outgoing messages
     */
    constructor(requestHandler: import("../RequestHandler"), disableEveryone: boolean);
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
    createWebhook(channelId: string, data: {
        name: string;
        avatar?: string;
    }): Promise<any>;
    /**
     * Get webhooks created within a channel
     * @param channelId - Id of the channel
     * @returns Array of [Webhook Objects](https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_WEBHOOKS    | always    |
     */
    getWebhooksChannel(channelId: string): Promise<Array<any>>;
    /**
     * Get all webhooks within a guild
     * @param guildId Id of the guild
     * @returns Array of [Webhook Objects](https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_WEBHOOKS    | always    |
     */
    getWebhooksGuild(guildId: string): Promise<Array<any>>;
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
    getWebhook(webhookId: string, token?: string): Promise<any>;
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
    updateWebhook(webhookId: string, token: string, data: {
        name?: string;
        avatar?: string;
        channel_id?: string;
    }): Promise<any>;
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
    deleteWebhook(webhookId: string, token: string): Promise<void>;
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
    executeWebhook(webhookId: string, token: string, data?: WebhookCreateMessageData, options?: {
        disableEveryone?: boolean;
    }): Promise<void>;
    /**
     * Execute a slack style Webhook
     * @param webhookId Id of the Webhook
     * @param token Webhook token
     * @param data Check [Slack's documentation](https://api.slack.com/incoming-webhooks)
     * @returns Resolves the Promise on successful execution
     */
    executeWebhookSlack(webhookId: string, token: string, data: any, options?: {
        disableEveryone?: boolean;
    }): Promise<void>;
}
interface WebhookCreateMessageData {
    /**
     * content of the message
     */
    content?: string | null;
    /**
     * username to use for the webhook
     */
    username?: string | null;
    /**
     * avatar url of the webhook
     */
    avatar_url?: string | null;
    /**
     * send a text to speech message
     */
    tts?: boolean | null;
    /**
     * File that should be uploaded
     */
    file?: {
        /**
         * Name of the file
         */
        name?: string;
        /**
         * Buffer with file contents
         */
        file: Buffer;
    };
    /**
     * Array of [embed objects](https://discord.com/developers/docs/resources/channel#embed-object)
     */
    embeds?: Array<import("@amanda/discordtypings").EmbedData>;
}
export = WebhookMethods;
