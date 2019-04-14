"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmailController_1 = require("../controllers/EmailController");
exports.default = [
    {
        method: "get",
        path: "/",
        handler: EmailController_1.email.sendEmail
    },
    {
        method: "post",
        path: "/v1/emails",
        handler: EmailController_1.email.sendEmail
    }
];
//# sourceMappingURL=routes.js.map