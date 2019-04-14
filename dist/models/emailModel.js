"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.EmailSchema = new mongoose_1.default.Schema({
    to: { type: String, required: true },
    from: { type: String, required: true },
    text: { type: String, required: true },
    subject: { type: String, required: true },
    status: { type: String, required: true },
});
const Email = mongoose_1.default.model("Email", exports.EmailSchema);
exports.default = Email;
//# sourceMappingURL=emailModel.js.map