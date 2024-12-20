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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJob = void 0;
const job_model_1 = require("../models/job.model");
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, location, salary, contactEmail } = req.body;
        const newJob = new job_model_1.Job({
            title,
            description,
            location,
            salary,
            contactEmail,
        });
        const savedJob = yield newJob.save();
        res
            .status(201)
            .json({ message: "Job created successfully", job: savedJob });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating job", error });
    }
});
exports.createJob = createJob;
//# sourceMappingURL=job.interface.js.map