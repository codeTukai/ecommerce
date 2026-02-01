import mongoose from "mongoose";

async function connectDB() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is missing in .env");
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ MongoDB connected");
    console.log("📦 Database name:", mongoose.connection.name);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

export default connectDB;
