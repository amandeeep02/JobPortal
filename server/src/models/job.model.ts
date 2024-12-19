import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  description: string;
  location: string;
  salary: number;
  contactEmail: string;
}

const JobSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
    contactEmail: { type: String, required: true },
  },
  { timestamps: true }
);

export const Job = mongoose.model<IJob>("Job", JobSchema);

