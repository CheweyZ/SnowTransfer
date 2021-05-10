"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Endpoints_1 = __importDefault(require("../Endpoints"));
/**
 * Methods for interacting with voice stuff via rest
 */
class VoiceMethods {
    /**
     * Create a new Voice Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.voice.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler request handler that calls the rest api
     */
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
     * Get currently available voice regions that can be used when creating servers
     * @returns Array of [voice region](https://discord.com/developers/docs/resources/voice#voice-region-object) objects
     */
    async getVoiceRegions() {
        return this.requestHandler.request(Endpoints_1.default.VOICE_REGIONS, "get", "json");
    }
}
module.exports = VoiceMethods;
