import mongoose from "mongoose";
import { env } from "../env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    throw new Error("database connection faield")
  }
};

export default connectDB;
