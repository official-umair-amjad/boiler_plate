import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { User } from '@prisma/client';
import prisma from '../config/database';
import { ApiError } from '../utils/ApiError';
import { 
  RegisterDto, 
  LoginDto, 
  AuthResponseDto, 
  UserResponseDto,
  ValidationConstants,
  JWTConstants,
  HttpStatus,
  ErrorCode,
  UserModel,
  DtoTransformer
} from '../models';

export class AuthService {
  private generateToken(userId: string): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }
    
    const expiresIn: StringValue = (process.env.JWT_EXPIRE || JWTConstants.ACCESS_TOKEN_EXPIRY) as StringValue;
    const options: SignOptions = {
      expiresIn
    };
    
    return jwt.sign({ id: userId }, secret, options);
  }

  private validatePassword(password: string): void {
    if (!UserModel.isValidPassword(password)) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST, 
        `Password must be at least ${ValidationConstants.PASSWORD_MIN_LENGTH} characters with uppercase, lowercase, and number`,
        ErrorCode.VALIDATION_ERROR
      );
    }
  }

  private validateEmail(email: string): void {
    if (!UserModel.isValidEmail(email)) {
      throw new ApiError(
        HttpStatus.BAD_REQUEST, 
        'Invalid email format',
        ErrorCode.VALIDATION_ERROR
      );
    }
  }

  async register(data: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, name } = data;

    // Validate input
    this.validateEmail(email);
    this.validatePassword(password);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new ApiError(
        HttpStatus.CONFLICT, 
        'User with this email already exists',
        ErrorCode.USER_ALREADY_EXISTS
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        name: name?.trim() || null
      }
    });

    // Generate token and transform response
    const token = this.generateToken(user.id);
    return DtoTransformer.userToAuthResponseDto(user, token);
  }

  async login(data: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = data;

    // Validate input
    this.validateEmail(email);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (!user) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED, 
        'Invalid email or password',
        ErrorCode.AUTHENTICATION_FAILED
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED, 
        'Invalid email or password',
        ErrorCode.AUTHENTICATION_FAILED
      );
    }

    // Generate token and transform response
    const token = this.generateToken(user.id);
    return DtoTransformer.userToAuthResponseDto(user, token);
  }

  async getCurrentUser(userId: string): Promise<UserResponseDto> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw new ApiError(
        HttpStatus.NOT_FOUND, 
        'User not found',
        ErrorCode.USER_NOT_FOUND
      );
    }

    return DtoTransformer.userToResponseDto(user);
  }
}
