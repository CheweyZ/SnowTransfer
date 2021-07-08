/**
 * Methods for interacting with Stage instances
 */
declare class StageInstanceMethods {
    requestHandler: import("../RequestHandler");
    /**
     * Create a new Stage Instance Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.stageInstance.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler request handler that calls the rest api
     */
    constructor(requestHandler: import("../RequestHandler"));
    /**
     * Creates a new stage instance associated to a stage channel
     * @param data The options for creating a stage instance
     * @returns a [stage instance](https://discord.com/developers/docs/resources/stage-instance#auto-closing-stage-instance-structure) object
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_CHANNELS    | always    |
     * | MUTE_MEMBERS       | always    |
     * | MOVE_MEMBERS       | always    |
     */
    createStageInstance(data: {
        channel_id: string;
        topic: string;
    }): Promise<import("@amanda/discordtypings").StageInstanceData>;
    /**
     * Gets the stage instance assocuated to a stage channel if it exists
     * @param channelID Id of the stage channel
     * @returns a [stage instance](https://discord.com/developers/docs/resources/stage-instance#auto-closing-stage-instance-structure) object
     */
    getStageInstance(channelId: string): Promise<import("@amanda/discordtypings").StageInstanceData>;
    /**
     * Updates an existing stage instance
     * @param channelId Id of the stage channel
     * @param data The new data to send
     * @returns a [stage instance](https://discord.com/developers/docs/resources/stage-instance#auto-closing-stage-instance-structure) object
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_CHANNELS    | always    |
     * | MUTE_MEMBERS       | always    |
     * | MOVE_MEMBERS       | always    |
     */
    editStageInstance(channelId: string, data: {
        topic: string;
    }): Promise<import("@amanda/discordtypings").StageInstanceData>;
    /**
     * Delete an existing stage instance
     * @param channelId Id of the stage channel
     * @returns a [stage instance](https://discord.com/developers/docs/resources/stage-instance#auto-closing-stage-instance-structure) object
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_CHANNELS    | always    |
     * | MUTE_MEMBERS       | always    |
     * | MOVE_MEMBERS       | always    |
     */
    deleteStageInstance(channelId: string): Promise<import("@amanda/discordtypings").StageInstanceData>;
}
export = StageInstanceMethods;
