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
exports.handleChatRequest = exports.getAIResponse = void 0;
const axios_1 = __importDefault(require("axios"));
// Function to get AI response from Google API
const getAIResponse = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCTkELgCcEFOjs2bLSSzeqgd3E3lNZ76QE`;
    try {
        // Make the API request
        const response = yield axios_1.default.post(API_URL, {
            contents: [
                {
                    parts: [
                        {
                            text: prompt,
                        },
                    ],
                },
            ],
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        // Debug: Log the response to understand the structure
        console.log("API Response:", JSON.stringify(response.data, null, 2));
        // Validate response structure
        if (!((_e = (_d = (_c = (_b = (_a = response.data.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text)) {
            console.error("Unexpected API response structure:", response.data);
            throw new Error("Invalid response structure from AI API");
        }
        // Extract and return the AI's response
        return response.data.candidates[0].content.parts[0].text;
    }
    catch (error) {
        // Handle specific axios errors
        if (axios_1.default.isAxiosError(error)) {
            console.error("Axios Error:", ((_f = error.response) === null || _f === void 0 ? void 0 : _f.data) || error.message);
            throw new Error(((_j = (_h = (_g = error.response) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.error) === null || _j === void 0 ? void 0 : _j.message) ||
                "Failed to connect to Gemini API");
        }
        // Handle other types of errors
        console.error("Error in getAIResponse:", error);
        throw new Error("Unexpected error while getting AI response");
    }
});
exports.getAIResponse = getAIResponse;
// Handler for chat requests
const handleChatRequest = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, exports.getAIResponse)(prompt);
        return {
            success: true,
            response: response,
        };
    }
    catch (error) {
        console.error("Error in handleChatRequest:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error occurred",
        };
    }
});
exports.handleChatRequest = handleChatRequest;
//# sourceMappingURL=chatbot.model.js.map