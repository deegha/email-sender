"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MainController_1 = require("./MainController");
const EmailService_1 = require("../services/EmailService");
class EmailController extends MainController_1.MainController {
    constructor() {
        super(...arguments);
        this.sendEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            if (!body.to || !body.content || !body.subject) {
                this.sendBadRequest(res);
            }
            else {
                try {
                    const response = yield EmailService_1.emailService.sendEmail(body);
                    res.send(response);
                }
                catch (err) {
                    this.sendServerError(res);
                }
            }
        });
        this.checkEmailStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id || id === null) {
                this.sendBadRequest(res);
            }
            else {
                try {
                    const response = yield EmailService_1.emailService.checkEmailStatus(id);
                    res.send(response);
                }
                catch (err) {
                    this.sendServerError(res);
                }
            }
        });
        this.handleWebHook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                EmailService_1.emailService.updateEmailStatus(req.body);
                res.send({ message: "success" });
            }
            catch (err) {
                this.sendServerError(res);
            }
        });
        this.deleteEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id || id === null) {
                this.sendBadRequest(res);
            }
            else {
                try {
                    const response = yield EmailService_1.emailService.deleteEmailFromQueue(id);
                    res.send(response);
                }
                catch (err) {
                    console.log(err);
                    this.sendServerError(res);
                }
            }
        });
    }
}
exports.email = new EmailController();
//# sourceMappingURL=EmailController.js.map