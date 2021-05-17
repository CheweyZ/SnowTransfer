"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Endpoints_1 = __importDefault(require("../Endpoints"));
/**
 * Methods for interacting with slash command specific endpoints
 */
class InteractionMethods {
    /**
     * Create a new Interaction Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.interaction.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler request handler that calls the rest api
     */
    constructor(requestHandler, webhooks) {
        this.requestHandler = requestHandler;
        this.webhooks = webhooks;
    }
    getApplicationCommands(appID) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMANDS(appID), "get", "json");
    }
    getApplicationCommand(appID, cmdID) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMAND(appID, cmdID), "get", "json");
    }
    createApplicationCommand(appID, data) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMANDS(appID), "post", "json", data);
    }
    editApplicationCommand(appID, cmdID, data) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMAND(appID, cmdID), "patch", "json", data);
    }
    bulkOverwriteApplicationCommands(appID, data) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMANDS(appID), "put", "json", data);
    }
    deleteApplicationCommand(appID, cmdID) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMAND(appID, cmdID), "delete", "json");
    }
    getGuildApplicationCommands(appID, guildID) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_GUILD_COMMANDS(appID, guildID), "get", "json");
    }
    getGuildApplicationCommand(appID, guildID, cmdID) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_GUILD_COMMAND(appID, guildID, cmdID), "get", "json");
    }
    createGuildApplicationCommand(appID, guildID, data) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_GUILD_COMMANDS(appID, guildID), "post", "json", data);
    }
    editGuildApplicationCommand(appID, guildID, cmdID, data) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_GUILD_COMMAND(appID, guildID, cmdID), "patch", "json", data);
    }
    bulkOverwriteGuildApplicationCommand(appID, guildID, data) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_GUILD_COMMANDS(appID, guildID), "put", "json", data);
    }
    deleteGuildApplicationCommand(appID, guildID, cmdID) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_GUILD_COMMAND(appID, guildID, cmdID), "delete", "json");
    }
    getOriginalInteractionResponse(appID, token) {
        return this.webhooks.getWebhookMessage(appID, token, "@original");
    }
    createInteractionResponse(interactionID, token, data) {
        return this.requestHandler.request(Endpoints_1.default.INTERACTION_CALLBACK(interactionID, token), "post", "json", data);
    }
    editOriginalInteractionResponse(appID, token, data) {
        return this.webhooks.editWebhookMessage(appID, token, "@original", data);
    }
    deleteOriginalInteractionResponse(appID, token) {
        return this.webhooks.deleteWebhookMessage(appID, token, "@original");
    }
    createFollowupMessage(appID, token, data) {
        return this.webhooks.executeWebhook(appID, token, data);
    }
    editFollowupMessage(appID, token, messageId, data) {
        return this.webhooks.editWebhookMessage(appID, token, messageId, data);
    }
    deleteFollowupMessage(appID, token, messageId) {
        return this.webhooks.deleteWebhookMessage(appID, token, messageId);
    }
    getGuildApplicationCommandPermissions(appID, guildID) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_APPLICATION_COMMAND_PERMISSIONS(appID, guildID), "get", "json");
    }
    getApplicationCommandPermissions(appID, guildID, cmdID) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMAND_PERMISSIONS(appID, guildID, cmdID), "get", "json");
    }
    editApplicationCommandPermissions(appID, guildID, cmdID, permissions) {
        const payload = {
            permissions: permissions
        };
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMAND_PERMISSIONS(appID, guildID, cmdID), "put", "json", payload);
    }
    batchEditApplicationCommandPermissions(appID, guildID, permissions) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_APPLICATION_COMMAND_PERMISSIONS(appID, guildID), "put", "json", permissions);
    }
}
module.exports = InteractionMethods;
