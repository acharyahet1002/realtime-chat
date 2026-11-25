import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
import "dotenv/config";
import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI || "";

export const connectDB = () => {
  return mongoose.connect(mongoURI);
};
