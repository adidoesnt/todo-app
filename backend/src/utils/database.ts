import config from "config.json";
import mongoose, { ConnectOptions } from "mongoose";

const { MONGODB_URI = "DUMMY-URI" } = process.env;

export const connectDB = async () => {
    console.log("💽 Connecting to MongoDB...");
    await mongoose
        .connect(MONGODB_URI, config.mongoose as ConnectOptions)
        .then(() => {
            console.log("💽 Connected to MongoDB!");
        });
};

export const disconnectDB = async () => {
    console.log("💽 Disconnecting from MongoDB...");
    await mongoose.disconnect().then(() => {
        console.log("💽 Disconnected from MongoDB!");
    });
};

export const Database = {
    connectDB,
    disconnectDB,
};
