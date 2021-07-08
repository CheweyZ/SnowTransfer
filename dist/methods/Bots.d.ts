/**
 * Methods for interacting with bot specific endpoints
 */
declare class BotMethods {
    requestHandler: import("../RequestHandler");
    /**
     * Create a new Bot Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.bot.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler request handler that calls the rest api
     */
    constructor(requestHandler: import("../RequestHandler"));
    /**
     * Get the gateway url to connect to
     * @returns [Gateway data](https://discord.com/developers/docs/topics/gateway#get-gateway-example-response)
     *
     * @example
     * let client = new SnowTransfer('TOKEN');
     * let result = await client.bot.getGateway();
     * // result should be something like {"url": "wss://gateway.discord.gg"}
     */
    getGateway(): Promise<GatewayData>;
    /**
     * Get the gateway url to connect to and a recommended amount of shards to use
     * @returns [Gateway data](https://discord.com/developers/docs/topics/gateway#get-gateway-example-response)
     *
     * @example
     * let client = new SnowTransfer('TOKEN');
     * let result = await client.bot.getGateway();
     * // result should be something like {"url": "wss://gateway.discord.gg", "shards": 1}
     */
    getGatewayBot(): Promise<GatewayData>;
}
interface GatewayData {
    url: string;
    shards?: number;
}
export = BotMethods;
