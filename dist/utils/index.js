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
const mongoose_1 = __importDefault(require("mongoose"));
const emailUtils_1 = require("./emailUtils");
exports.getEmailStatusString = emailUtils_1.getEmailStatusString;
exports.getEmailStatus = emailUtils_1.getEmailStatus;
exports.setEmailScheduler = emailUtils_1.setEmailScheduler;
const applyMiddleware = (middleware, router) => {
    for (const f of middleware) {
        f(router);
    }
};
exports.applyMiddleware = applyMiddleware;
const applyRoutes = (routes, router) => {
    for (const route of routes) {
        const { method, path, handler } = route;
        router[method](path, handler);
    }
};
exports.applyRoutes = applyRoutes;
const connectDatabase = () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_Password}@different-email-7rxdy.mongodb.net/test?retryWrites=true`, {
            useNewUrlParser: true
        });
        console.log("connected to database");
    }
    catch (err) {
        console.log("error in database ", err);
    }
});
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=index.js.map