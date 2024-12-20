"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Application.ts
const mongoose_1 = __importDefault(require("mongoose"));
const ApplicationSchema = new mongoose_1.default.Schema({
    jobId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    candidateName: {
        type: String,
        required: true,
    },
    candidateEmail: {
        type: String,
        required: true,
    },
    candidateResume: {
        type: String, // URL or text for now
        required: true,
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
});
const Application = mongoose_1.default.model("Application", ApplicationSchema);
exports.default = Application;
//# sourceMappingURL=application.model.js.map