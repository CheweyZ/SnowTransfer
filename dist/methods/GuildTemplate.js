"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Endpoints_1 = __importDefault(require("../Endpoints"));
/**
 * Methods for interacting with Guild Templates
 */
class GuildTemplateMethods {
    /**
     * Create a new Guild Template Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.guildTemplate.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler - request handler that calls the rest api
     */
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    getGuildTemplate(code) {
        return this.requestHandler.request(Endpoints_1.default.TEMPLATE(code), "get", "json");
    }
    createGuildFromGuildTemplate(code, options) {
        return this.requestHandler.request(Endpoints_1.default.TEMPLATE(code), "post", "json", options);
    }
    /**
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    getGuildTemplates(guildID) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_TEMPLATES(guildID), "get", "json");
    }
    /**
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    createGuildTemplate(guildID, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_TEMPLATES(guildID), "post", "json", data);
    }
    /**
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    syncGuildTemplate(guildID, code) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_TEMPLATE(guildID, code), "put", "json");
    }
    /**
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    modifyGuildTemplate(guildID, code, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_TEMPLATE(guildID, code), "patch", "json", data);
    }
    /**
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    deleteGuildTemplate(guildID, code) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_TEMPLATE(guildID, code), "delete", "json");
    }
}
module.exports = GuildTemplateMethods;
