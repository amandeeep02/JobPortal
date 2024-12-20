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
exports.handleChatRequest = void 0;
const chatbot_model_1 = require("../models/chatbot.model");
const handleChatRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    if (!prompt) {
        res.status(400).json({ error: "Prompt is required" });
        return;
    }
    try {
        const aiResponse = yield (0, chatbot_model_1.getAIResponse)(prompt);
        res.status(200).json({ response: aiResponse });
    }
    catch (error) {
        console.error("Error in handleChatRequest:", error);
        res.status(500).json({ error: "Failed to fetch AI response" });
    }
});
exports.handleChatRequest = handleChatRequest;
//# sourceMappingURL=chatbot.controller.js.map