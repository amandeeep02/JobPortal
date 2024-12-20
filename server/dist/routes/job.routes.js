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
// src/routes/JobRoutes.ts
const express_1 = require("express");
const job_controller_1 = require("../controllers/job.controller");
const job_controller_2 = require("../controllers/job.controller");
const job_model_1 = require("../models/job.model");
const router = (0, express_1.Router)();
// Update a job
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedJob = yield job_model_1.Job.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        res.status(200).json({ success: true, job: updatedJob });
    }
    catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}));
// Delete a job
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedJob = yield job_model_1.Job.findByIdAndDelete(id);
        if (!deletedJob) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        res.status(200).json({ success: true, message: 'Job deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}));
router.post("/jobs", job_controller_1.createJob);
router.get("/jobs", job_controller_2.getAllJobs);
exports.default = router;
//# sourceMappingURL=job.routes.js.map