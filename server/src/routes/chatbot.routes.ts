import express, { Router } from "express";
import { handleChatRequest } from "../controllers/chatbot.controller";

const router: Router = express.Router();

router.post("/", handleChatRequest);

export default router;
