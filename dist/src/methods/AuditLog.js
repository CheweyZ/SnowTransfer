"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Endpoints_1 = __importDefault(require("../Endpoints"));
class AuditLogMethods {
    /**
     * Create a new Audit Log Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.auditLog.method`, where `client` is an initialized SnowTransfer instance
     * @param requestHandler request handler that calls the rest api
     */
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
     * Get the audit logs of the specified guild id
     * @param guildId id of a guild
     * @param data optional audit log filter values
     * @returns An object with audit log data
     *
     * | Permissions needed |
     * |--------------------|
     * | VIEW_AUDIT_LOG     |
     */
    async getAuditLog(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_AUDIT_LOGS(guildId), "get", "json", data);
    }
}
module.exports = AuditLogMethods;
