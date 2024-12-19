import { ObjectId, Document } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  email: string;
  currentLocation: string;
  destination: string;
  eta: string;
  isOnline: boolean;
  activeJourney: ObjectId;
}
