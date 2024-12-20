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
exports.getCurrentUser = exports.createOrUpdateUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const createOrUpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName, role } = req.body;
    try {
        const user = yield user_model_1.default.findOneAndUpdate({ email }, {
            firstName,
            lastName,
            role,
            email,
            isOnline: true,
        }, { new: true, upsert: true });
        res.json(user);
    }
    catch (err) {
        console.error("Create/Update user error:", err);
        res.status(400).json({ error: "Failed to create/update user" });
    }
});
exports.createOrUpdateUser = createOrUpdateUser;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (err) {
        console.error("Get current user error:", err);
        res.status(400).json({ error: "Failed to get current user" });
    }
});
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=user.controller.js.map