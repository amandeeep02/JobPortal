// src/routes/JobRoutes.ts
import { Router } from "express";
import { createJob } from "../controllers/job.controller";
import { getAllJobs } from "../controllers/job.controller";
import { Job } from "../models/job.model";

const router = Router();

// Update a job
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.status(200).json({ success: true, job: updatedJob });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Delete a job
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.status(200).json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post("/jobs", createJob);
router.get("/jobs", getAllJobs);

export default router;
