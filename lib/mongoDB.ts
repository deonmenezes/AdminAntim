import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true)

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "Borcelle_Admin",
      // Add timeout settings to prevent timeouts
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000
    })

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (err) {
    console.log("MongoDB connection error:", err)
  }
}