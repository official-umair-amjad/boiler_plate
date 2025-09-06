# MERN Stack Boilerplate - Implementation Guide

## 📋 Requirements Summary

Based on the email, you need to create a MERN stack boilerplate with:

**Tech Stack:**
- Frontend: React (TypeScript)
- Backend: Node.js (TypeScript, Express)
- Database: PostgreSQL

**Must-Have Features:**
1. ✅ Proper folder structure (modular and scalable)
2. ✅ Middleware implementation (logging, validation, authentication)
3. ✅ Centralized error handling with consistent response format
4. ✅ Environment variable management (.env, .env.example)
5. ✅ Database integration with ORM (Prisma/Sequelize/TypeORM)
6. ✅ API documentation (Swagger or Postman collection)
7. ✅ Code formatting with Prettier + ESLint
8. ✅ Git version control with meaningful commits
9. ✅ README with setup instructions

---

## 🏗️ Implementation Steps

### Phase 1: Project Structure & Initial Setup

#### Step 1: Initialize Project Structure
```
mern-boilerplate/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config/
│   │   └── app.ts
│   ├── prisma/
│   ├── docs/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── types/
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
├── README.md
├── .gitignore
└── package.json (root)
```

#### Step 2: Git Setup
```bash
git init
git add .
git commit -m "feat: initial project structure"
```

### Phase 2: Backend Development

#### Step 3: Backend Dependencies
```bash
cd backend
npm init -y
npm install express cors helmet morgan dotenv bcryptjs jsonwebtoken
npm install prisma @prisma/client
npm install swagger-jsdoc swagger-ui-express
npm install -D typescript @types/node @types/express @types/cors @types/bcryptjs @types/jsonwebtoken @types/swagger-jsdoc @types/swagger-ui-express
npm install -D nodemon ts-node eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

#### Step 4: TypeScript Configuration
Create `tsconfig.json` in backend:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### Step 5: Prisma Setup
```bash
npx prisma init
```

Update `schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

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

#### Step 6: Environment Configuration
Create `.env.example`:
```
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/boilerplate_db"
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
```

#### Step 7: Core Backend Structure

**src/config/database.ts:**
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

**src/middleware/auth.ts:**
```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new ApiError(401, 'Access denied. No token provided.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
```

**src/middleware/errorHandler.ts:**
```typescript
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};
```

**src/utils/ApiError.ts:**
```typescript
export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}
```

#### Step 8: Swagger Documentation Setup
**src/config/swagger.ts:**
```typescript
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MERN Boilerplate API',
      version: '1.0.0',
      description: 'A simple Express API with TypeScript',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
```

### Phase 3: Frontend Development

#### Step 9: Frontend Setup
```bash
cd ../frontend
npx create-react-app . --template typescript
npm install axios react-router-dom
npm install -D @types/react-router-dom
```

#### Step 10: Frontend Structure
Create the component structure with proper TypeScript interfaces and services.

### Phase 4: Code Quality & Documentation

#### Step 11: ESLint & Prettier Setup
**Backend .eslintrc.js:**
```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    '@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn'
  }
};
```

**prettier.config.js:**
```javascript
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2
};
```

#### Step 12: Package.json Scripts
Add these scripts to backend package.json:
```json
{
  "scripts": {
    "dev": "nodemon src/app.ts",
    "build": "tsc",
    "start": "node dist/app.js",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:seed": "ts-node prisma/seed.ts"
  }
}
```

---

## 🎯 What You Need To Do:

1. **Create the project structure** as outlined above
2. **Implement each component systematically** following the steps
3. **Test each feature** as you build it
4. **Write meaningful Git commits** for each feature
5. **Document everything** in the README
6. **Ensure all requirements are met** before submission

## 📝 Key Success Criteria:

- ✅ Full-stack application works end-to-end
- ✅ Clean, modular code structure
- ✅ Proper error handling and validation
- ✅ Complete API documentation
- ✅ Professional README with setup instructions
- ✅ Proper Git history with meaningful commits

## ⏰ Recommended Timeline:
- **Day 1-2**: Backend setup, database, and core APIs
- **Day 3-4**: Frontend development and integration
- **Day 5**: Documentation, testing, and final polish

Good luck with your submission! This boilerplate will demonstrate your understanding of modern full-stack development practices.
