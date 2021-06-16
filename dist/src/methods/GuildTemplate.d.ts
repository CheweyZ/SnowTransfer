/**
 * Methods for interacting with Guild Templates
 */
declare class GuildTemplateMethods {
    requestHandler: import("../RequestHandler");
    /**
     * Create a new Guild Template Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.guildTemplate.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler - request handler that calls the rest api
     */
    constructor(requestHandler: import("../RequestHandler"));
    getGuildTemplate(code: string): Promise<import("@amanda/discordtypings").GuildTemplateData>;
    createGuildFromGuildTemplate(code: string, options: {
        name: string;
        icon?: string | null;
    }): Promise<import("@amanda/discordtypings").GuildData>;
    /**
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    getGuildTemplates(guildID: string): Promise<Array<import("@amanda/discordtypings").GuildTemplateData>>;
    /**
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    createGuildTemplate(guildID: string, data: {
        name: string;
        description?: string | null;
    }): Promise<import("@amanda/discordtypings").GuildTemplateData>;
    /**
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    syncGuildTemplate(guildID: string, code: string): Promise<import("@amanda/discordtypings").GuildTemplateData>;
    /**
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    modifyGuildTemplate(guildID: string, code: string, data: {
        name?: string;
        description?: string | null;
    }): Promise<import("@amanda/discordtypings").GuildTemplateData>;
    /**
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_GUILD       | always    |
     */
    deleteGuildTemplate(guildID: string, code: string): Promise<import("@amanda/discordtypings").GuildTemplateData>;
}
export = GuildTemplateMethods;
