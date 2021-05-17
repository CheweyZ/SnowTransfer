declare type WebhookMethods = import("./Webhooks");
/**
 * Methods for interacting with slash command specific endpoints
 */
declare class InteractionMethods {
    requestHandler: import("../RequestHandler");
    webhooks: import("./Webhooks");
    /**
     * Create a new Interaction Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.interaction.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler request handler that calls the rest api
     */
    constructor(requestHandler: import("../RequestHandler"), webhooks: import("./Webhooks"));
    getApplicationCommands(appID: string): Promise<Array<import("@amanda/discordtypings").ApplicationCommand>>;
    getApplicationCommand(appID: string, cmdID: string): Promise<import("@amanda/discordtypings").ApplicationCommand>;
    createApplicationCommand(appID: string, data: CommandData): Promise<import("@amanda/discordtypings").ApplicationCommand>;
    editApplicationCommand(appID: string, cmdID: string, data: Partial<CommandData>): Promise<import("@amanda/discordtypings").ApplicationCommand>;
    bulkOverwriteApplicationCommands(appID: any, data: Array<CommandData>): Promise<Array<import("@amanda/discordtypings").ApplicationCommand>>;
    deleteApplicationCommand(appID: string, cmdID: string): Promise<void>;
    getGuildApplicationCommands(appID: string, guildID: string): Promise<Array<import("@amanda/discordtypings").ApplicationCommand>>;
    getGuildApplicationCommand(appID: string, guildID: string, cmdID: string): Promise<import("@amanda/discordtypings").ApplicationCommand>;
    createGuildApplicationCommand(appID: string, guildID: string, data: CommandData): Promise<import("@amanda/discordtypings").ApplicationCommand>;
    editGuildApplicationCommand(appID: string, guildID: string, cmdID: string, data: Partial<CommandData>): Promise<import("@amanda/discordtypings").ApplicationCommand>;
    bulkOverwriteGuildApplicationCommand(appID: string, guildID: string, data: Array<CommandData>): Promise<Array<import("@amanda/discordtypings").ApplicationCommand>>;
    deleteGuildApplicationCommand(appID: string, guildID: string, cmdID: string): Promise<void>;
    getOriginalInteractionResponse(appID: string, token: string): Promise<import("@amanda/discordtypings").MessageData>;
    createInteractionResponse(interactionID: string, token: string, data: import("@amanda/discordtypings").InteractionResponseData): Promise<void>;
    editOriginalInteractionResponse(appID: string, token: string, data: Parameters<WebhookMethods["editWebhookMessage"]>[3]): Promise<import("@amanda/discordtypings").MessageData>;
    deleteOriginalInteractionResponse(appID: string, token: string): Promise<void>;
    createFollowupMessage(appID: string, token: string, data: Parameters<WebhookMethods["executeWebhook"]>[2] & {
        flags?: number;
    }): Promise<void>;
    editFollowupMessage(appID: string, token: string, messageId: string, data: Parameters<WebhookMethods["editWebhookMessage"]>[3]): Promise<import("@amanda/discordtypings").MessageData>;
    deleteFollowupMessage(appID: string, token: string, messageId: string): Promise<void>;
    getGuildApplicationCommandPermissions(appID: string, guildID: string): Promise<Array<import("@amanda/discordtypings").GuildApplicationCommandPermissions>>;
    getApplicationCommandPermissions(appID: string, guildID: string, cmdID: string): Promise<import("@amanda/discordtypings").GuildApplicationCommandPermissions>;
    editApplicationCommandPermissions(appID: string, guildID: string, cmdID: string, permissions: Array<Exclude<import("@amanda/discordtypings").ApplicationCommandPermissions, "id">>): Promise<any>;
    batchEditApplicationCommandPermissions(appID: string, guildID: string, permissions: Array<Pick<import("@amanda/discordtypings").GuildApplicationCommandPermissions, "id" | "permissions">>): Promise<any>;
}
export = InteractionMethods;
interface CommandData {
    name: string;
    description: string;
    options?: Array<import("@amanda/discordtypings").ApplicationCommandOption>;
    default_permission?: boolean;
}
