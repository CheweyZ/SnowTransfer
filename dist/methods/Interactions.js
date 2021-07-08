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
    /**
     * Fetch all global commands for your application
     * @param appID The ID of the application
     * @returns An Array of [application command](https://discord.com/developers/docs/interactions/slash-commands#application-command-object) objects
     */
    getApplicationCommands(appID) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMANDS(appID), "get", "json");
    }
    /**
     * Fetch a global command for your application
     * @param appID The ID of the application
     * @param cmdID The ID of the command
     * @returns An [application command](https://discord.com/developers/docs/interactions/slash-commands#application-command-object) object
     */
    getApplicationCommand(appID, cmdID) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMAND(appID, cmdID), "get", "json");
    }
    /**
     * Create a new global command. New global commands will be available in all guilds after 1 hour
     * @param appID The ID of the application
     * @param data The command data
     * @returns An [application command](https://discord.com/developers/docs/interactions/slash-commands#application-command-object) object
     */
    createApplicationCommand(appID, data) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMANDS(appID), "post", "json", data);
    }
    /**
     * Edit a global command. Updates will be available in all guilds after 1 hour
     * @param appID The ID of the application
     * @param cmdID The ID of the command
     * @param data The command data
     * @returns An [application command](https://discord.com/developers/docs/interactions/slash-commands#application-command-object) object
     */
    editApplicationCommand(appID, cmdID, data) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMAND(appID, cmdID), "patch", "json", data);
    }
    /**
     * Takes a list of application commands, overwriting existing commands that are registered globally for this application.
     * Updates will be available in all guilds after 1 hour
     * @param appID The ID of the application
     * @param data Array of commands
     * @returns An Array of [application command](https://discord.com/developers/docs/interactions/slash-commands#application-command-object) objects
     */
    bulkOverwriteApplicationCommands(appID, data) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMANDS(appID), "put", "json", data);
    }
    /**
     * Deletes a global command
     * @param appID The ID of the application
     * @param cmdID The ID of the command
     * @returns Resolves the Promise on successful execution
     */
    deleteApplicationCommand(appID, cmdID) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMAND(appID, cmdID), "delete", "json");
    }
    /**
     * Fetch all of the guild commands for your application for a specific guild.
     * @param appID The ID of the application
     * @param guildID The ID of the guild
     * @returns An Array of [application command](https://discord.com/developers/docs/interactions/slash-commands#application-command-object) objects
     */
    getGuildApplicationCommands(appID, guildID) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_GUILD_COMMANDS(appID, guildID), "get", "json");
    }
    /**
     * Fetch a guild command for your application
     * @param appID The ID of the application
     * @param guildID The ID of the guild
     * @param cmdID The ID of the command
     * @returns An [application command](https://discord.com/developers/docs/interactions/slash-commands#application-command-object) object
     */
    getGuildApplicationCommand(appID, guildID, cmdID) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_GUILD_COMMAND(appID, guildID, cmdID), "get", "json");
    }
    /**
     * Create a new guild command. New guild commands will be available in the guild immediately.
     * @param appID The ID of the application
     * @param guildID The ID of the guild
     * @param data Command data
     * @returns An [application command](https://discord.com/developers/docs/interactions/slash-commands#application-command-object) object
     */
    createGuildApplicationCommand(appID, guildID, data) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_GUILD_COMMANDS(appID, guildID), "post", "json", data);
    }
    /**
     * Edit a guild command. Updates for guild commands will be available immediately.
     * @param appID The ID of the application
     * @param guildID The ID of the guild
     * @param cmdID The ID of the command
     * @param data New command data
     * @returns An [application command](https://discord.com/developers/docs/interactions/slash-commands#application-command-object) object
     */
    editGuildApplicationCommand(appID, guildID, cmdID, data) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_GUILD_COMMAND(appID, guildID, cmdID), "patch", "json", data);
    }
    /**
     * Takes a list of application commands, overwriting existing commands for the guild
     * @param appID The ID of the application
     * @param guildID The ID of the guild
     * @param data Array of commands
     * @returns An Array of [application command](https://discord.com/developers/docs/interactions/slash-commands#application-command-object) objects
     */
    bulkOverwriteGuildApplicationCommand(appID, guildID, data) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_GUILD_COMMANDS(appID, guildID), "put", "json", data);
    }
    /**
     * Delete a guild command
     * @param appID The ID of the application
     * @param guildID The ID of the guild
     * @param cmdID The ID of the command
     * @returns Resolves the Promise on successful execution
     */
    deleteGuildApplicationCommand(appID, guildID, cmdID) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_GUILD_COMMAND(appID, guildID, cmdID), "delete", "json");
    }
    /**
     * Returns the initial Interaction response
     * @param appID The ID of the application
     * @param token The token of the interaction
     * @returns A [message]() object
     */
    getOriginalInteractionResponse(appID, token) {
        return this.webhooks.getWebhookMessage(appID, token, "@original");
    }
    /**
     * Create a response to an Interaction
     * @param interactionID The ID of the interaction
     * @param token The token of the interaction
     * @param data Response data
     * @returns Resolves the Promise on successful execution
     */
    createInteractionResponse(interactionID, token, data) {
        return this.requestHandler.request(Endpoints_1.default.INTERACTION_CALLBACK(interactionID, token), "post", "json", data);
    }
    /**
     * Edits the initial Interaction response
     * @param appID The ID of the application
     * @param token The token of the interaction
     * @param data New response data
     * @returns A [message]() object
     */
    editOriginalInteractionResponse(appID, token, data) {
        return this.webhooks.editWebhookMessage(appID, token, "@original", data);
    }
    /**
     * Deletes the initial Interaction response
     * @param appID The ID of the application
     * @param token The token of the interaction
     * @returns Resolves the Promise on successful execution
     */
    deleteOriginalInteractionResponse(appID, token) {
        return this.webhooks.deleteWebhookMessage(appID, token, "@original");
    }
    /**
     * Create a followup message for an Interaction
     * @param appID The ID of the application
     * @param token The token of the interaction
     * @param data Message data
     * @returns A [message](object)
     */
    createFollowupMessage(appID, token, data) {
        // @ts-ignore
        return this.webhooks.executeWebhook(appID, token, data);
    }
    /**
     * Edits a followup message for an Interaction
     * @param appID The ID of the application
     * @param token The token of the interaction
     * @param messageId The ID of the message
     * @param data The new message data
     * @returns A [message](object)
     */
    editFollowupMessage(appID, token, messageId, data) {
        return this.webhooks.editWebhookMessage(appID, token, messageId, data);
    }
    /**
     * Deletes a followup message for an Interaction
     * @param appID The ID of the application
     * @param token The token of the interaction
     * @param messageId The ID of the message
     * @returns Resolves the Promise on successful execution
     */
    deleteFollowupMessage(appID, token, messageId) {
        return this.webhooks.deleteWebhookMessage(appID, token, messageId);
    }
    /**
     * Fetches command permissions for all commands for your application in a guild
     * @param appID The ID of the application
     * @param guildID The ID of the guild
     * @returns An Array of [guild application command permission](https://discord.com/developers/docs/interactions/slash-commands#application-command-permissions-object-guild-application-command-permissions-structure) objects
     */
    getGuildApplicationCommandPermissions(appID, guildID) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_APPLICATION_COMMAND_PERMISSIONS(appID, guildID), "get", "json");
    }
    /**
     * Fetches command permissions for a specific command for your application in a guild
     * @param appID The ID of the application
     * @param guildID The ID of the guild
     * @param cmdID The ID of the command
     * @returns A [guild application command permission](https://discord.com/developers/docs/interactions/slash-commands#application-command-permissions-object-guild-application-command-permissions-structure) object
     */
    getApplicationCommandPermissions(appID, guildID, cmdID) {
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMAND_PERMISSIONS(appID, guildID, cmdID), "get", "json");
    }
    /**
     * Edits command permissions for a specific command for your application in a guild. You can only add up to 10 permission overwrites for a command.
     * @param appID The ID of the application
     * @param guildID The ID of the guild
     * @param cmdID The ID of the command
     * @param permissions New application command permissions data
     * @returns A [guild application command permission](https://discord.com/developers/docs/interactions/slash-commands#application-command-permissions-object-guild-application-command-permissions-structure) object
     */
    editApplicationCommandPermissions(appID, guildID, cmdID, permissions) {
        const payload = {
            permissions: permissions
        };
        return this.requestHandler.request(Endpoints_1.default.APPLICATION_COMMAND_PERMISSIONS(appID, guildID, cmdID), "put", "json", payload);
    }
    /**
     * Batch edits permissions for all commands in a guild. Takes an Array of partial [guild application command permission](https://discord.com/developers/docs/interactions/slash-commands#application-command-permissions-object-guild-application-command-permissions-structure) objects.
     * You can only add up to 10 permission overwrites for a command
     * @param appID The ID of the application
     * @param guildID The ID of the guild
     * @param permissions New application command permissions data Array
     * @returns An Array of [guild application command permission](https://discord.com/developers/docs/interactions/slash-commands#application-command-permissions-object-guild-application-command-permissions-structure) objects
     */
    batchEditApplicationCommandPermissions(appID, guildID, permissions) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_APPLICATION_COMMAND_PERMISSIONS(appID, guildID), "put", "json", permissions);
    }
}
module.exports = InteractionMethods;
