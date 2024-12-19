
import { Request, Response } from "express";
import { Job } from "../models/job.model";

export const createJob = async (req: Request, res: Response) => {
  try {
    const { title, description, location, salary, contactEmail } = req.body;

    const newJob = new Job({
      title,
      description,
      location,
      salary,
      contactEmail,
    });

    const savedJob = await newJob.save();
    res
      .status(201)
      .json({ message: "Job created successfully", job: savedJob });
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error });
  }
};
