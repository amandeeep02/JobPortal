"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/user", auth_middleware_1.authCheck, user_controller_1.createOrUpdateUser);
router.get("/current-user", auth_middleware_1.authCheck, user_controller_1.getCurrentUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map