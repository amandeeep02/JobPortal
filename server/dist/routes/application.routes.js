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
// routes/applicationRoutes.ts
const express_1 = __importDefault(require("express"));
const application_controller_1 = require("../controllers/application.controller");
const application_model_1 = __importDefault(require("../models/application.model"));
const router = express_1.default.Router();
router.post("/apply", application_controller_1.applyJob);
router.get("/:jobId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobId } = req.params;
        const applications = yield application_model_1.default.find({ jobId }).sort({
            appliedAt: -1,
        });
        res.status(200).json({ success: true, applications });
    }
    catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}));
exports.default = router;
//# sourceMappingURL=application.routes.js.map