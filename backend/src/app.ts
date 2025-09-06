import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { specs, swaggerUi } from './config/swagger';
import routes from './routes';
import { errorHandler, notFound } from './middleware/errorHandler';
import prisma from './config/database';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }'
}));

// API routes
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to MERN Boilerplate API!',
    version: '1.0.0',
    documentation: '/api-docs',
    health: '/api/health'
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Database connection check
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
    
    // Test a simple query to verify the connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('Database query test passed');
    
    return true;
  } catch (error) {
    console.error('Database connection failed:');
    console.error(error);
    return false;
  }
}

// Start server
const server = app.listen(PORT, async () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`Health Check: http://localhost:${PORT}/api/health`);
  
  // Check database connection
  const isDbConnected = await checkDatabaseConnection();
  
  if (!isDbConnected) {
    console.log('Server started but database connection failed');
    console.log('Please check your DATABASE_URL in .env file');
    console.log('Make sure to run: npm run db:migrate');
  } else {
    console.log('Server and database are ready!');
  }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await prisma.$disconnect();
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;
