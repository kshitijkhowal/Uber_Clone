import mongoose from "mongoose";

// Connect to MongoDB

export default async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MONGO_DB connect successfully: ${conn.connection.host}`);
    } catch (error) {
        console.log(`MONGO_DB connection error `, error);
    }
}
