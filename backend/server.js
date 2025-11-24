import express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler.js';
import { connectDB } from './db/db.js';
import helmet from 'helmet';
import authRoutes from './routes/authRoutes.js';
import userRoutes from "./routes/userRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoute.js"
import {isAuth}  from "./middlewares/isAuth.js"
import {isAdmin} from './middlewares/isAdmin.js';
import adminRoutes from './routes/adminRoutes.js';
import paymentRoutes from "./routes/paymentRoutes.js"
import { apiLimiter } from "./middlewares/rateLimiter.js";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
export default app;

// Connect to database (skip in test environment)
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// Middleware
app.use(express.json());
app.use(apiLimiter);
app.use(helmet());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'E-Commerce API Documentation'
}));

// Routes
app.use('/auth', authRoutes);
app.use("/users",isAuth, userRoutes);
app.use("/products", productRoutes);
app.use("/orders",isAuth, orderRoutes);
app.use("/cart", isAuth, cartRoutes);
app.use("/admin", isAuth, isAdmin, adminRoutes);
app.use("/payments", paymentRoutes);


app.use(errorHandler);

// Start server (skip in test environment)
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}


