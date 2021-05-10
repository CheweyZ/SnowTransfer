"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Endpoints_1 = __importDefault(require("../Endpoints"));
/**
 * Methods for interacting with invites
 */
class InviteMethods {
    /**
     * Create a new Invite Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.invite.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler request handler that calls the rest api
     */
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
     * Get the invite data on an invite id
     * @param inviteId Id of the invite
     * @param withCounts When set to true you get an invite object with additional `approximate_presence_count` and `approximate_member_count` fields
     * @returns [Invite Object](https://discord.com/developers/docs/resources/invite#invite-object)
     */
    async getInvite(inviteId, withCounts = false) {
        return this.requestHandler.request(Endpoints_1.default.INVITE(inviteId), "get", "json", { with_counts: withCounts });
    }
    /**
     * Delete an invite
     * @param inviteId
     * @returns [Invite Object](https://discord.com/developers/docs/resources/invite#invite-object)
     *
     * | Permissions needed | Condition |
     * |--------------------|-----------|
     * | MANAGE_CHANNELS    | always    |
     */
    async deleteInvite(inviteId) {
        return this.requestHandler.request(Endpoints_1.default.INVITE(inviteId), "delete", "json");
    }
}
module.exports = InviteMethods;
