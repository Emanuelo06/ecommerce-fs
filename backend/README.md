# E-Commerce Backend API

A robust, scalable RESTful API backend for an e-commerce platform built with Node.js, Express, and MongoDB. This backend provides comprehensive functionality for user authentication, product management, shopping cart operations, order processing, and payment integration.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Database Models](#database-models)
- [Security Features](#security-features)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Current Features

- **User Authentication & Authorization**
  - User registration and login
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Password hashing with bcrypt

- **Product Management**
  - Create, read, update, and delete products
  - Product image uploads via Cloudinary
  - Category-based organization
  - Stock management

- **Shopping Cart**
  - Add/remove items from cart
  - Update item quantities
  - Price snapshot (preserves price at time of adding to cart)
  - Cart total calculation

- **Order Management**
  - Create orders from cart
  - Order status tracking (pending, shipped, delivered, cancelled)
  - Shipping information management
  - Order history for users

- **Payment Integration**
  - Stripe payment processing
  - Secure payment handling

- **Admin Features**
  - Admin-only routes and operations
  - Product management capabilities

- **Security**
  - Rate limiting to prevent abuse
  - Helmet.js for security headers
  - Input validation with Zod
  - Error handling middleware

- **File Upload**
  - Image upload support
  - Cloudinary integration for cloud storage

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Validation**: Zod
- **Payment Processing**: Stripe
- **File Upload**: Multer + Cloudinary
- **Security**: Helmet.js, express-rate-limit
- **Environment Variables**: dotenv

## 📁 Project Structure

```
backend/
├── config/
│   └── cloudinary.js          # Cloudinary configuration
├── controllers/               # Request handlers
│   ├── authController.js
│   ├── cartController.js
│   ├── orderController.js
│   ├── paymentController.js
│   ├── productController.js
│   ├── uploadController.js
│   └── userController.js
├── db/
│   ├── db.js                  # Database connection
│   └── models/                # Mongoose models
│       ├── Cart.js
│       ├── Order.js
│       ├── Product.js
│       └── User.js
├── middlewares/               # Custom middleware
│   ├── errorHandler.js        # Global error handler
│   ├── isAdmin.js             # Admin authorization
│   ├── isAuth.js              # Authentication middleware
│   ├── rateLimiter.js         # Rate limiting
│   ├── upload.js              # File upload handling
│   └── validate.js            # Validation middleware
├── routes/                    # API routes
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoute.js
│   ├── paymentRoutes.js
│   ├── productRoutes.js
│   ├── uploadRoutes.js
│   └── userRoutes.js
├── services/                  # Business logic layer
│   ├── authService.js
│   ├── cartService.js
│   ├── orderService.js
│   ├── paymentService.js
│   ├── productService.js
│   ├── uploadService.js
│   └── userService.js
├── validation/                # Zod validation schemas
│   ├── cartValidation.js
│   ├── orderValidation.js
│   ├── paymentValidation.js
│   ├── productValidation.js
│   └── userValidation.js
├── server.js                  # Application entry point
├── package.json
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Stripe Account** (for payment processing)
- **Cloudinary Account** (for image storage)

## 🚀 Installation

1. **Clone the repository** (if not already done)
   ```bash
   git clone <repository-url>
   cd ecommerce-fs/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the `backend` directory
   - See [Environment Variables](#environment-variables) section for required variables

4. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

**⚠️ Important**: Never commit your `.env` file to version control. It should be listed in `.gitignore`.

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

This will start the server with nodemon, which automatically restarts the server when you make changes.

### Production Mode

```bash
node server.js
```

## 📚 API Documentation

### Base URL

```
http://localhost:5000
```

### API Endpoints

#### Authentication Routes (`/auth`)

- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout 

#### User Routes (`/users`) - Requires Authentication

- `GET /users/profile` - Get current user profile
- `PUT /users/profile` - Update user profile
- `DELETE /users/profile` - Delete user account

#### Product Routes (`/products`)

- `GET /products` - Get all products
- `GET /products/:id` - Get a single product
- `POST /products` - Create a new product (Admin only)
- `PUT /products/:id` - Update a product (Admin only)
- `DELETE /products/:id` - Delete a product (Admin only)

#### Cart Routes (`/cart`) - Requires Authentication

- `GET /cart` - Get user's cart
- `POST /cart` - Add item to cart
- `PUT /cart/:itemId` - Update cart item quantity
- `DELETE /cart/:itemId` - Remove item from cart
- `DELETE /cart` - Clear entire cart

#### Order Routes (`/orders`) - Requires Authentication

- `GET /orders` - Get user's orders
- `GET /orders/:id` - Get a specific order
- `POST /orders` - Create a new order from cart

#### Payment Routes (`/payments`)

- `POST /payments/create-intent` - Create payment intent
- `POST /payments/confirm` - Confirm payment

#### Admin Routes (`/admin`) - Requires Admin Authentication

- Admin-specific endpoints for managing products, users, and orders

#### Upload Routes (`/upload`)

- `POST /upload` - Upload product images

## 🔑 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Here's how it works:

1. **Registration/Login**: Users register or login to receive a JWT token
2. **Token Usage**: Include the token in the `Authorization` header for protected routes:
   ```
   Authorization: Bearer <your_jwt_token>
   ```
3. **Token Expiration**: Tokens expire after the time specified in `JWT_EXPIRE` (default: 7 days)

### Protected Routes

Most routes require authentication. The `isAuth` middleware validates the JWT token. Admin routes additionally require the `isAdmin` middleware to verify the user has admin privileges.

## 🗄 Database Models

### User Model
- `username` (String, required)
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `phoneNumber` (String, optional)
- `address` (String, optional)
- `role` (String, enum: ['user', 'admin'], default: 'user')
- `createdAt` (Date)

### Product Model
- `title` (String, required)
- `description` (String, required)
- `price` (Number, required)
- `category` (String, required)
- `stock` (Number, required, default: 1)
- `images` (Array of Strings)
- `createdAt` (Date)

### Order Model
- `products` (Array of objects with productId and quantity)
- `userId` (ObjectId, reference to User)
- `shippingInfo` (Object with username, email, phoneNumber, address)
- `totalAmount` (Number, required)
- `status` (String, enum: ['pending', 'shipped', 'delivered', 'cancelled'])
- `createdAt` (Date)

### Cart Model
- `userId` (ObjectId, reference to User, unique)
- `items` (Array of cart items with productId, quantity, priceSnapshot)
- `total` (Number, default: 0)

## 🔒 Security Features

- **Helmet.js**: Sets various HTTP headers to help protect the app from well-known web vulnerabilities
- **Rate Limiting**: Prevents abuse by limiting the number of requests from a single IP
- **Password Hashing**: Uses bcryptjs to securely hash passwords
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Zod schemas validate all incoming data
- **Error Handling**: Centralized error handling middleware

## 🚧 Future Enhancements

The following features are planned for future implementation:

### 🔍 Search, Filtering & Pagination

- **Pagination**: Implement pagination for product listings, order history, and admin views to improve performance and user experience
  - Query parameters: `page`, `limit`
  - Response will include pagination metadata (total pages, current page, etc.)

- **Filtering**: Add advanced filtering capabilities for products
  - Filter by category, price range, stock availability
  - Filter orders by status, date range
  - Query parameters: `category`, `minPrice`, `maxPrice`, `inStock`, etc.

- **Search**: Implement full-text search functionality
  - Search products by title, description, or category
  - Search users by username or email (admin only)
  - Query parameter: `q` or `search`

### 👥 Admin Dashboard Features

- **View All Orders**: Admin interface to view and manage all orders across the platform
  - Filter orders by status, date, user
  - Update order status
  - View order details

- **View All Users**: Admin interface to view and manage all registered users
  - View user profiles
  - Manage user roles
  - View user order history

### 🧪 Testing

- **Jest Testing Framework**: Comprehensive test suite implementation
  - Unit tests for services and utilities
  - Integration tests for API endpoints
  - Test coverage reports
  - Mock data and test fixtures

### 📝 Logging

- **Morgan**: HTTP request logging middleware
  - Log all incoming requests with details (method, URL, status, response time)
  - Different log formats for development and production

- **Winston**: Advanced application logging
  - Log levels (error, warn, info, debug)
  - Log rotation and file management
  - Structured logging with metadata
  - Separate log files for different log levels
  - Console and file transports

### 📧 Email Notifications

- **Email Service Integration**: Automated email notifications
  - Order confirmation emails
  - Order status update notifications
  - Welcome emails for new users
  - Password reset emails
  - Admin notifications for important events
  - Integration with services like SendGrid, Nodemailer, or AWS SES

## 📄 License

This project is licensed under the ISC License.




