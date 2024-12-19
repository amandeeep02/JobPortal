// routes/applicationRoutes.ts
import express from "express";
import { applyJob } from "../controllers/application.controller";
import Application from "../models/application.model";

const router = express.Router();

router.post("/apply", applyJob);

router.get("/:jobId", async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ jobId }).sort({
      appliedAt: -1,
    });
    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


export default router;

