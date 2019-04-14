"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = __importDefault(require("node-schedule"));
const EmailService_1 = require("../services/EmailService");
const config_1 = require("../config/config");
exports.getEmailStatus = (code) => {
    switch (code) {
        case config_1.STATUS_ACCEPTED:
            return "ACCEPTED";
        case config_1.STATUS_SENT:
            return "SENT";
        case config_1.STATUS_QUEUED:
            return "QUEUED";
        case config_1.STATUS_DROPED:
            return "FAILED";
    }
};
exports.getEmailStatusString = (code) => {
    switch (code) {
        case "processed":
            return config_1.STATUS_ACCEPTED;
        case "delivered":
            return config_1.STATUS_SENT;
        case "dropped":
            return config_1.STATUS_DROPED;
    }
};
// "26 * * * *"
exports.setEmailScheduler = (timer) => {
    node_schedule_1.default.scheduleJob(timer, EmailService_1.emailService.sendAllQueuedEmails);
};
//# sourceMappingURL=emailUtils.js.map