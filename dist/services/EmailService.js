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
class EmailService {
    constructor() {
        this.sendEmail = (dtoObject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const shouldQued = this.shouldQued();
                let emailStatus;
                if (!shouldQued) {
                    const response = yield this.emailService({
                        to: dtoObject.to,
                        from: utils_1.SENDER_EMAIL,
                        subject: dtoObject.subject,
                        text: dtoObject.content
                    });
                    emailStatus = response[0].statusCode;
                }
                else {
                    emailStatus = utils_1.STATUS_QUEUED;
                }
                const databaseResponse = yield this.saveEmailDetails({
                    to: dtoObject.to,
                    from: utils_1.SENDER_EMAIL,
                    subject: dtoObject.subject,
                    text: dtoObject.content,
                    status: emailStatus
                });
                return {
                    id: databaseResponse._id,
                    status: utils_1.getEmailStatus(emailStatus)
                };
            }
            catch (err) {
                throw new Error(`error in email service`);
            }
        });
        this.checkEmailStatus = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = yield emailModel_1.default.findById(id);
                const status = utils_1.getEmailStatus(email.status);
                return status;
            }
            catch (err) {
                throw new Error(`error in finding the record ${err}`);
            }
        });
        this.sendAllQueuedEmails = () => __awaiter(this, void 0, void 0, function* () {
            const queuedEmails = yield emailModel_1.default.find().where("status").equals(utils_1.STATUS_QUEUED);
            this.emailService(queuedEmails);
        });
        this.updateEmailStatus = (id, payload) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield emailModel_1.default.findByIdAndUpdate(id, payload);
                console.log(response);
                return response;
            }
            catch (err) {
                throw new Error(`error in updating the status of the email ${err}`);
            }
        });
        this.shouldQued = () => {
            const format = "HH:mm:ss";
            const timenow = moment_1.default().format(format);
            const time = moment_1.default(timenow, format);
            const beforeTime = moment_1.default("08:00:00", format);
            const afterTime = moment_1.default("24:00:00", format);
            const value = time.isBetween(beforeTime, afterTime);
            return !value;
        };
        this.emailService = (msg) => __awaiter(this, void 0, void 0, function* () {
            try {
                mail_1.default.setApiKey(process.env.SEND_GRID_API_KEY);
                return yield mail_1.default.send(msg);
            }
            catch (err) {
                throw new Error(`error in sending email ${err}`);
            }
        });
        this.saveEmailDetails = (emailObj) => __awaiter(this, void 0, void 0, function* () {
            const email = new emailModel_1.default(emailObj);
            try {
                const response = yield email.save();
                return response;
            }
            catch (err) {
                throw new Error(`error in saving to database ${err}`);
            }
        });
    }
}
exports.emailService = new EmailService();
//# sourceMappingURL=EmailService.js.map