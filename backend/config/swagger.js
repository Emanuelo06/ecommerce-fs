import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce Backend API',
      version: '1.0.0',
      description: 'A comprehensive RESTful API for an e-commerce platform with authentication, product management, shopping cart, orders, and payment processing.',
      contact: {
        name: 'API Support',
        email: 'support@ecommerce.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
            },
            username: {
              type: 'string',
              description: 'Username',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            phoneNumber: {
              type: 'string',
              description: 'Phone number',
            },
            address: {
              type: 'string',
              description: 'User address',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              description: 'User role',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation date',
            },
          },
        },
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Product ID',
            },
            title: {
              type: 'string',
              description: 'Product title',
            },
            description: {
              type: 'string',
              description: 'Product description',
            },
            price: {
              type: 'number',
              description: 'Product price',
            },
            category: {
              type: 'string',
              description: 'Product category',
            },
            stock: {
              type: 'number',
              description: 'Available stock',
            },
            images: {
              type: 'array',
              items: {
                type: 'string',
                format: 'uri',
              },
              description: 'Product images',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Product creation date',
            },
          },
        },
        Cart: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Cart ID',
            },
            userId: {
              type: 'string',
              description: 'User ID',
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'string',
                    description: 'Product ID',
                  },
                  quantity: {
                    type: 'number',
                    description: 'Item quantity',
                  },
                  priceSnapshot: {
                    type: 'number',
                    description: 'Price at time of adding to cart',
                  },
                },
              },
            },
            total: {
              type: 'number',
              description: 'Cart total',
            },
          },
        },
        Order: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Order ID',
            },
            userId: {
              type: 'string',
              description: 'User ID',
            },
            products: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'string',
                    description: 'Product ID',
                  },
                  quantity: {
                    type: 'number',
                    description: 'Product quantity',
                  },
                },
              },
            },
            shippingInfo: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                  format: 'email',
                },
                phoneNumber: {
                  type: 'string',
                },
                address: {
                  type: 'string',
                },
              },
            },
            totalAmount: {
              type: 'number',
              description: 'Total order amount',
            },
            status: {
              type: 'string',
              enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
              description: 'Order status',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Order creation date',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Current page',
            },
            limit: {
              type: 'number',
              description: 'Items per page',
            },
            total: {
              type: 'number',
              description: 'Total items',
            },
            totalPages: {
              type: 'number',
              description: 'Total pages',
            },
            results: {
              type: 'number',
              description: 'Results in current page',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication endpoints',
      },
      {
        name: 'Users',
        description: 'User management endpoints',
      },
      {
        name: 'Products',
        description: 'Product management endpoints',
      },
      {
        name: 'Cart',
        description: 'Shopping cart endpoints',
      },
      {
        name: 'Orders',
        description: 'Order management endpoints',
      },
      {
        name: 'Payments',
        description: 'Payment processing endpoints',
      },
      {
        name: 'Admin',
        description: 'Admin-only endpoints',
      },
    ],
  },
  apis: ['./swagger/**/*.js'], // Path to the Swagger documentation files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

