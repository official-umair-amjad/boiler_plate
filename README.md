# MERN Stack Boilerplate

A comprehensive, production-ready MERN (MongoDB/PostgreSQL, Express, React, Node.js) stack boilerplate with TypeScript, featuring authentication, API documentation, and best practices.

## 🚀 Features

- **Backend (Node.js + TypeScript + Express)**
  - RESTful API with Express.js
  - PostgreSQL database with Prisma ORM
  - JWT-based authentication
  - Comprehensive middleware (logging, validation, authentication)
  - Centralized error handling
  - API documentation with Swagger
  - Code formatting with Prettier + ESLint

- **Frontend (React + TypeScript)**
  - Modern React with hooks and context
  - TypeScript for type safety
  - React Router for navigation
  - Axios for API integration
  - Responsive design with CSS
  - Authentication context and protected routes

- **Development Features**
  - Hot reloading for both frontend and backend
  - Concurrent development server script
  - Git hooks for code quality
  - Environment variable management
  - Database migrations and seeding

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd mern-boilerplate
```

### 2. Install Dependencies

Install dependencies for both frontend and backend:

```bash
# Install root dependencies (for concurrent development)
npm install

# Install backend dependencies
npm run install-server

# Install frontend dependencies
npm run install-client
```

### 3. Environment Configuration

#### Backend Environment Variables

1. Copy the environment example file:
```bash
cd backend
cp env.example .env
```

2. Update the `.env` file with your configuration:
```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/boilerplate_db"
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

#### Frontend Environment Variables

1. Copy the environment example file:
```bash
cd frontend
cp env.example .env
```

2. Update the `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE boilerplate_db;
```

2. Run database migrations:
```bash
cd backend
npm run db:migrate
```

3. Generate Prisma client:
```bash
npm run db:generate
```

### 5. Start the Application

#### Development Mode (Recommended)

Run both frontend and backend concurrently:
```bash
# From root directory
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

#### Individual Services

Start backend only:
```bash
npm run server
```

Start frontend only:
```bash
npm run client
```

## 📚 API Documentation

Once the backend is running, you can access the interactive API documentation at:
- **Swagger UI**: `http://localhost:5000/api-docs`

The API provides the following endpoints:

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires authentication)

### Health Check

- `GET /api/health` - Server health check

## 🏗️ Project Structure

```
mern-boilerplate/
├── backend/                    # Backend application
│   ├── src/
│   │   ├── config/            # Configuration files (database, swagger)
│   │   ├── controllers/       # Request handlers
│   │   ├── middleware/        # Custom middleware (auth, validation, error handling)
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Utility functions and classes
│   │   └── app.ts            # Express app setup
│   ├── prisma/               # Database schema and migrations
│   ├── docs/                 # API documentation
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/                  # React frontend application
│   ├── public/               # Static files
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── contexts/         # React contexts (Auth)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service functions
│   │   ├── types/            # TypeScript type definitions
│   │   ├── utils/            # Utility functions
│   │   ├── App.tsx           # Main App component
│   │   └── index.tsx         # React entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── package.json              # Root package.json for scripts
├── README.md                 # This file
└── .gitignore               # Git ignore rules
```

## 🔧 Available Scripts

### Root Level Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start backend only
- `npm run client` - Start frontend only
- `npm run build` - Build both frontend and backend for production
- `npm run install-all` - Install dependencies for both frontend and backend

### Backend Scripts

```bash
cd backend
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:reset     # Reset database
npm run db:studio    # Open Prisma Studio
```

### Frontend Scripts

```bash
cd frontend
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests
npm run eject        # Eject from Create React App
```

## 🔐 Authentication Flow

1. **Registration**: Users can register with email, password, and optional name
2. **Login**: Users authenticate with email and password
3. **JWT Token**: Server issues JWT token on successful authentication
4. **Protected Routes**: Frontend protects routes using React Context
5. **API Authentication**: Backend validates JWT tokens for protected endpoints

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. Current schema includes:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}
```

## 🚢 Production Deployment

### Backend Deployment

1. Build the backend:
```bash
cd backend
npm run build
```

2. Set production environment variables
3. Run database migrations:
```bash
npm run db:migrate
```

4. Start the production server:
```bash
npm start
```

### Frontend Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Serve the `build` folder using a static file server

### Environment Variables for Production

Make sure to set these environment variables in your production environment:

**Backend:**
- `NODE_ENV=production`
- `PORT=5000`
- `DATABASE_URL=<production-database-url>`
- `JWT_SECRET=<strong-secret-key>`
- `CORS_ORIGIN=<frontend-production-url>`

**Frontend:**
- `REACT_APP_API_URL=<backend-production-url>/api`

## 🧪 Testing

### Backend Testing

```bash
cd backend
npm test
```

### Frontend Testing

```bash
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests and linting
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📝 Code Style

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

Run the following commands to maintain code quality:

```bash
# Backend
cd backend
npm run lint:fix
npm run format

# Frontend
cd frontend
npm run lint --fix
```

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in .env file
   - Verify database exists

2. **Port Already in Use**
   - Change PORT in backend .env file
   - Or kill the process using the port

3. **CORS Issues**
   - Verify CORS_ORIGIN in backend .env
   - Ensure frontend URL matches

4. **JWT Token Issues**
   - Clear localStorage in browser
   - Check JWT_SECRET configuration

### Getting Help

If you encounter any issues:
1. Check the console for error messages
2. Review environment variables
3. Ensure all dependencies are installed
4. Check database connection

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at scale
- [Swagger](https://swagger.io/) - API documentation

---

## 🎯 Next Steps

This boilerplate provides a solid foundation. Consider adding:

- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Rate limiting
- [ ] Email verification
- [ ] Password reset functionality
- [ ] File upload capabilities
- [ ] WebSocket integration
- [ ] Advanced logging with Winston
- [ ] Monitoring and analytics

Happy coding! 🚀
