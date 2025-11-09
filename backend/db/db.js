const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGODB_URI;
 const connectDB = async()=> {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connected successfully")
    } catch (error){
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
}

module.exports = { connectDB };