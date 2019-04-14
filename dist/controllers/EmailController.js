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
const EmailService_1 = require("../services/EmailService");
class EmailController {
    constructor() {
        this.sendEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const response = yield EmailService_1.emailService.sendEmail(body);
                const responseObj = response;
                res.send(responseObj);
            }
            catch (err) {
                res.status(500).send({
                    message: "somthing went wrong"
                });
            }
        });
        this.checkEmailStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const status = yield EmailService_1.emailService.checkEmailStatus(id);
                res.send({
                    id,
                    status
                });
            }
            catch (err) {
                res.status(500).send({
                    message: "somthing went wrong"
                });
            }
        });
        this.handleWebHook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            res.send({ message: "success" });
        });
    }
}
exports.email = new EmailController();
//# sourceMappingURL=EmailController.js.map