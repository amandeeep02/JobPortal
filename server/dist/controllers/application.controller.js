"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyJob = void 0;
const application_model_1 = __importDefault(require("../models/application.model"));
const applyJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobId, candidateName, candidateEmail, candidateResume } = req.body;
        if (!jobId || !candidateName || !candidateEmail || !candidateResume) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }
        const application = new application_model_1.default({
            jobId,
            candidateName,
            candidateEmail,
            candidateResume,
        });
        yield application.save();
        res
            .status(201)
            .json({ success: true, message: "Application submitted successfully" });
    }
    catch (error) {
        console.error("Error applying for job:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
exports.applyJob = applyJob;
//# sourceMappingURL=application.controller.js.map