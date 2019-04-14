"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = __importDefault(require("node-schedule"));
const EmailService_1 = require("../services/EmailService");
exports.SENDER_EMAIL = "test@gmail.com";
exports.STATUS_QUEUED = 102;
exports.STATUS_SENT = 202;
exports.getEmailStatus = (code) => {
    switch (code) {
        case exports.STATUS_SENT:
            return "SENT";
        case exports.STATUS_QUEUED:
            return "QUEUED";
    }
};
// "26 * * * *"
exports.setEmailScheduler = (timer) => {
    node_schedule_1.default.scheduleJob(timer, EmailService_1.emailService.sendAllQueuedEmails);
};
//# sourceMappingURL=emailUtils.js.map