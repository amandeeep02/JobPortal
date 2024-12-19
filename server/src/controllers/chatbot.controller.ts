import { Request, Response } from "express";
import { getAIResponse } from "../models/chatbot.model";

export const handleChatRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: "Prompt is required" });
    return;
  }

  try {
    const aiResponse = await getAIResponse(prompt);
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("Error in handleChatRequest:", error);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
};
