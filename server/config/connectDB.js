import mongoose from "mongoose";

async function connectDB() {
  try {
    console.log("Mongo URL:", process.env.MONGO_URL); // must NOT be undefined
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err.message);
    process.exit(1);
  }
}

export default connectDB;