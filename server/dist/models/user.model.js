"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    currentLocation: String,
    destination: String,
    eta: String,
    isOnline: {
        type: Boolean,
        default: false,
    },
    activeJourney: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Journey",
    },
}, { timestamps: true });
const UserModel = mongoose_1.default.model("Users", UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map