"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
const emailModel_1 = __importDefault(require("../models/emailModel"));
const moment_1 = __importDefault(require("moment"));
const utils_1 = require("../utils");
const config_1 = require("../config/config");
class EmailService {
    constructor() {
        /**
         * Sending emails and Queueing emails
         */
        this.sendEmail = (dtoObject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shouldQued = this.shouldQued();
                let emailStatus = config_1.STATUS_ACCEPTED;
                const savedId = yield this.saveEmailDetails({
                    to: dtoObject.to,
                    from: config_1.SENDER_EMAIL,
                    subject: dtoObject.subject,
                    text: dtoObject.content,
                    status: config_1.STATUS_ACCEPTED,
                });
                if (!shouldQued) {
                    const emailObject = {
                        to: dtoObject.to,
                        from: config_1.SENDER_EMAIL,
                        subject: dtoObject.subject,
                        text: dtoObject.content,
                        custom_args: {
                            diffId: savedId
                        }
                    };
                    this.emailService(emailObject);
                }
                else {
                    emailStatus = config_1.STATUS_QUEUED;
                    this.updateEmail(savedId, { status: config_1.STATUS_QUEUED });
                }
                return {
                    id: savedId,
                    status: utils_1.getEmailStatus(emailStatus)
                };
            }
            catch (err) {
                throw new Error(`error in email service`);
            }
        });
        /**
         * Check the current status for a given email batch
         */
        this.checkEmailStatus = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = yield emailModel_1.default.findById(id);
                const status = utils_1.getEmailStatus(parseInt(email.status, 10));
                return {
                    id,
                    status
                };
            }
            catch (err) {
                throw new Error(`error in finding the record ${err}`);
            }
        });
        /**
         * Send emails to all the Queued emails
         */
        this.sendAllQueuedEmails = () => __awaiter(this, void 0, void 0, function* () {
            const queuedEmails = yield emailModel_1.default.find().where("status").equals(config_1.STATUS_QUEUED);
            const mailList = queuedEmails.map((mail) => ({
                to: mail.to,
                from: mail.from,
                subject: mail.subject,
                text: mail.text,
                custom_args: {
                    diffId: mail._id,
                }
            }));
            console.log(mailList, "mailList");
            this.emailService(mailList);
        });
        /**
         * Update the status of a given email batch
         */
        this.updateEmailStatus = (list) => {
            list.map((event) => {
                this.updateEmail(event.diffId, {
                    status: utils_1.getEmailStatusString(event.event)
                });
            });
        };
        /**
         * Delete email for a given id
         */
        this.deleteEmailFromQueue = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield emailModel_1.default.findByIdAndRemove(id);
                return { deleted: true, id };
            }
            catch (err) {
                throw new Error(`error in deleting the email ${err}`);
            }
        });
        /**
         * Updates any value of email object for a given id
         */
        this.updateEmail = (id, payload) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield emailModel_1.default.findByIdAndUpdate(id, payload);
                return response;
            }
            catch (err) {
                throw new Error(`error in updating the status of the email ${err}`);
            }
        });
        /**
         * Checks if the email should be queued or send directly
         */
        this.shouldQued = () => {
            const timenow = moment_1.default().format(config_1.TIME_FORMAT);
            const time = moment_1.default(timenow, config_1.TIME_FORMAT);
            const beforeTime = moment_1.default(config_1.QUEUE_END, config_1.TIME_FORMAT);
            const afterTime = moment_1.default(config_1.QUEUE_START, config_1.TIME_FORMAT);
            const value = time.isBetween(beforeTime, afterTime);
            return !value;
        };
        /**
         * Calling sendgrid SDK to send emails
         */
        this.emailService = (msg) => {
            try {
                mail_1.default.setApiKey(process.env.SEND_GRID_API_KEY);
                mail_1.default.send(msg);
            }
            catch (err) {
                console.log(err);
                throw new Error(`error in sending email ${err}`);
            }
        };
        /**
         * Save emails in the database
         */
        this.saveEmailDetails = (emailObj) => __awaiter(this, void 0, void 0, function* () {
            const email = new emailModel_1.default(emailObj);
            try {
                const response = yield email.save();
                return response._id;
            }
            catch (err) {
                throw new Error(`error in saving to database ${err}`);
            }
        });
    }
}
exports.emailService = new EmailService();
//# sourceMappingURL=EmailService.js.map