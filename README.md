# MERN Stack Boilerplate with TypeScript

A comprehensive, production-ready MERN stack boilerplate featuring modern development practices, robust architecture, and scalable folder structure.

## 🚀 Tech Stack

### Frontend
- **React 19** with TypeScript
- **React Router** for navigation
- **Axios** for API communication
- **Context API** for state management
- **Modern CSS** with responsive design

### Backend
- **Node.js** with TypeScript
- **Express.js** web framework
- **Prisma ORM** for database operations
- **PostgreSQL** database
- **JWT** authentication
- **bcryptjs** for password hashing

### Development Tools
- **ESLint** + **Prettier** for code quality
- **Nodemon** for development server
- **ts-node** for TypeScript execution
- **Swagger** for API documentation
- **Morgan** for request logging
- **Helmet** for security headers

## 📁 Project Structure

```
mern-boilerplate/
├── frontend/                 # React TypeScript application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React Context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript type definitions
│   │   └── App.tsx         # Main App component
│   ├── package.json
│   └── tsconfig.json
├── backend/                 # Node.js TypeScript API
│   ├── prisma/             # Database schema and migrations
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Data models and DTOs
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic layer
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── tsconfig.json
└── package.json            # Root package.json for scripts
```

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (USER/ADMIN)
- Protected routes and API endpoints
- Token validation and refresh

### 🛡️ Security & Middleware
- **Helmet** for security headers
- **CORS** configuration for cross-origin requests
- **Morgan** logging for request monitoring
- **Input validation** middleware
- **Error handling** with consistent API responses
- **Rate limiting** ready configuration

### 🏗️ Architecture & Design Patterns
- **Modular folder structure** for scalability
- **Service layer** for business logic separation
- **Data Transfer Objects (DTOs)** for type safety
- **Repository pattern** with Prisma ORM
- **Centralized error handling**
- **Consistent API response format**

### 🔄 Database Integration
- **Prisma ORM** with PostgreSQL
- **Database migrations** and seeding
- **Type-safe database queries**
- **Connection pooling** and optimization

### 📚 API Documentation
- **Swagger/OpenAPI** integration
- **Interactive API documentation**
- **Automated endpoint discovery**
- **Request/response schema validation**

### 🎨 Code Quality & Formatting
- **ESLint** with TypeScript rules
- **Prettier** for consistent formatting
- **Pre-commit hooks** ready
- **TypeScript strict mode** enabled

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mern-boilerplate
```

### 2. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm run install-all

# Or install individually
npm run install-server  # Backend dependencies
npm run install-client  # Frontend dependencies
```

### 3. Environment Setup

#### Backend Environment
Create `backend/.env` from `backend/env.example`:
```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/boilerplate_db"
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

#### Frontend Environment
Create `frontend/.env` from `frontend/env.example`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Database Setup
```bash
cd backend

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# (Optional) Seed the database
npm run db:seed
```

### 5. Start Development Servers
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run server  # Backend only (http://localhost:5000)
npm run client  # Frontend only (http://localhost:3000)
```

## 📖 API Documentation

Once the backend server is running, access the interactive API documentation at:
**http://localhost:5000/api-docs**

### Available Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

#### Health Check
- `GET /api/health` - Server health status

### API Response Format
All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "code": "ERROR_CODE"
}
```

## 🗃️ Database Schema

### User Model
```sql
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

## 🛠️ Development

### Code Quality Scripts
```bash
cd backend

# Linting
npm run lint           # Check for linting errors
npm run lint:fix       # Fix linting errors

# Formatting
npm run format         # Format code with Prettier

# Type checking
npx tsc --noEmit      # Check TypeScript types
```

### Database Operations
```bash
cd backend

# Prisma commands
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run migrations
npm run db:reset       # Reset database
npm run db:studio      # Open Prisma Studio
```

### Building for Production
```bash
# Build both frontend and backend
npm run build

# Or build individually
cd backend && npm run build
cd frontend && npm run build
```

## 📝 Environment Variables

### Backend Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:3000` |

### Frontend Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000/api` |

## 🔒 Security Features

- **JWT Authentication** with secure token storage
- **Password Hashing** using bcryptjs with salt rounds
- **CORS Protection** with configurable origins
- **Helmet Security Headers** for XSS and injection protection
- **Input Validation** for all API endpoints
- **SQL Injection Protection** via Prisma ORM
- **Error Information Limiting** in production

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

## 🚀 Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Set production environment variables
3. Run database migrations: `npm run db:migrate`
4. Start the server: `npm start`

### Frontend Deployment
1. Build the application: `npm run build`
2. Serve the `build` folder using a static file server
3. Configure environment variables for production API URL

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📜 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run server` - Start backend only
- `npm run client` - Start frontend only
- `npm run build` - Build both applications
- `npm run install-all` - Install all dependencies

### Backend Scripts
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run db:*` - Database operations

### Frontend Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.


## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/) for the React setup
- [Prisma](https://prisma.io/) for the excellent ORM
- [Express.js](https://expressjs.com/) for the web framework
- [TypeScript](https://www.typescriptlang.org/) for type safety

---

**Note**: This boilerplate is designed to be a starting point for MERN stack applications. Feel free to modify and extend it according to your project requirements.