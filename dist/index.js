"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const utils_1 = require("./utils");
const middleware_1 = __importDefault(require("./middleware"));
const routes_1 = __importDefault(require("./middleware/routes"));
dotenv_1.default.config();
const port = process.env.SERVER_PORT;
const router = express_1.default();
utils_1.applyMiddleware(middleware_1.default, router);
utils_1.applyRoutes(routes_1.default, router);
utils_1.connectDatabase();
const server = http_1.default.createServer(router);
utils_1.setEmailScheduler("32 * * * *");
server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map