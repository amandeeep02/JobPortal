// controllers/applicationController.ts
import { Request, Response } from "express";
import Application from "../models/application.model";

export const applyJob = async (req: Request, res: Response) => {
  try {
    const { jobId, candidateName, candidateEmail, candidateResume } = req.body;

    if (!jobId || !candidateName || !candidateEmail || !candidateResume) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const application = new Application({
      jobId,
      candidateName,
      candidateEmail,
      candidateResume,
    });

    await application.save();
    res
      .status(201)
      .json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
