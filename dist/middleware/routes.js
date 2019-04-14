"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmailController_1 = require("../controllers/EmailController");
exports.default = [
    {
        method: "post",
        path: "/v1/emails",
        handler: EmailController_1.email.sendEmail
    },
    {
        method: "get",
        path: "/v1/emails/:id",
        handler: EmailController_1.email.checkEmailStatus
    },
    {
        method: "post",
        path: "/v1/webhook",
        handler: EmailController_1.email.handleWebHook
    }
];
//# sourceMappingURL=routes.js.map