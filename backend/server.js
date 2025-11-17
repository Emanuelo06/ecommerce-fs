import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoute.js"
import isAuth  from "../middlewares/isAuth.js"
import isAdmin from '../middlewares/isAdmin.js';
import adminRoutes from './routes/adminRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());


// Routes
app.use('/auth', authRoutes);
app.use("/users",isAuth, userRoutes)
app.use("/products", productRoutes);
app.use("/orders",isAuth, orderRoutes);
app.use("/admin", isAuth, isAdmin, adminRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
