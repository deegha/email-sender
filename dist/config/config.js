"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
exports.errors = {
    BAD_REQUEST: "Check your payload",
    INTERNAL_SERVER_ERROR: "Somthing went wrong in the server"
};
exports.SENDER_EMAIL = "test@gmail.com";
exports.STATUS_QUEUED = 250;
exports.STATUS_SENT = 200;
exports.STATUS_ACCEPTED = 202;
exports.STATUS_DROPED = 400;
/**
 *  from left to right :
 *  second (0 - 59),
 *  minute (0 - 59)
 *  hour (0 - 23)
 *  day of month (1 - 31)
 *  month (1 - 12)
 *  day of week (0 - 7)
 */
exports.SHEDULE_TIMER = "32 * * * *";
exports.TIME_FORMAT = "HH:mm:ss";
/**
 * Time the emails should start to queue
 */
exports.QUEUE_END = moment_1.default("08:00:00", exports.TIME_FORMAT);
exports.QUEUE_START = moment_1.default("20:00:00", exports.TIME_FORMAT);
//# sourceMappingURL=config.js.map