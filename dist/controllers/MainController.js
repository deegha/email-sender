"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
class MainController {
    constructor() {
        this.sendBadRequest = (res) => {
            res.status(400).send({ error: config_1.errors.BAD_REQUEST });
        };
        this.sendServerError = (res) => {
            res.status(500).send({ error: config_1.errors.INTERNAL_SERVER_ERROR });
        };
    }
}
exports.MainController = MainController;
//# sourceMappingURL=MainController.js.map