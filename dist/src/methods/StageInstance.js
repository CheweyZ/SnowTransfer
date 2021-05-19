"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Endpoints_1 = __importDefault(require("../Endpoints"));
/**
 * Methods for interacting with Stage instances
 */
class StageInstanceMethods {
    /**
     * Create a new Stage Instance Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.stageInstance.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler request handler that calls the rest api
     */
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
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
    async createStageInstance(data) {
        return this.requestHandler.request(Endpoints_1.default.STAGE_INSTANCES, "post", "json", data);
    }
    /**
     * Gets the stage instance assocuated to a stage channel if it exists
     * @param channelID Id of the stage channel
     * @returns a [stage instance](https://discord.com/developers/docs/resources/stage-instance#auto-closing-stage-instance-structure) object
     */
    async getStageInstance(channelId) {
        return this.requestHandler.request(Endpoints_1.default.STAGE_INSTANCE_CHANNEL(channelId), "get", "json");
    }
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
    async editStageInstance(channelId, data) {
        return this.requestHandler.request(Endpoints_1.default.STAGE_INSTANCE_CHANNEL(channelId), "patch", "json", data);
    }
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
    async deleteStageInstance(channelId) {
        return this.requestHandler.request(Endpoints_1.default.STAGE_INSTANCE_CHANNEL(channelId), "delete", "json");
    }
}
module.exports = StageInstanceMethods;
