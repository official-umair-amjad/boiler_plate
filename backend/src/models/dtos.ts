import { Role } from './enums';

/**
 * Data Transfer Objects for API requests and responses
 */

// Authentication DTOs
export interface RegisterDto {
  email: string;
  password: string;
  name?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  user: UserResponseDto;
  token: string;
}

// User DTOs
export interface UserResponseDto {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  createdAt: string; // ISO string format for JSON
  updatedAt: string; // ISO string format for JSON
}

export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
  role?: Role;
}

export interface UpdateUserDto {
  email?: string;
  name?: string;
  role?: Role;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

// API Response DTOs
export interface ApiSuccessResponseDto<T = any> {
  success: true;
  message: string;
  data: T;
  timestamp: string;
}

export interface ApiErrorResponseDto {
  success: false;
  message: string;
  error: string;
  code?: string;
  timestamp: string;
  path?: string;
}

export interface PaginationDto {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponseDto<T> {
  data: T[];
  pagination: PaginationDto;
}

// Query DTOs
export interface UserQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  role?: Role;
  sortBy?: 'createdAt' | 'updatedAt' | 'email' | 'name';
  sortOrder?: 'asc' | 'desc';
}

// Validation DTOs
export interface ValidationErrorDto {
  field: string;
  message: string;
  value?: any;
}

export interface ValidationResponseDto {
  success: false;
  message: string;
  errors: ValidationErrorDto[];
  timestamp: string;
}

/**
 * DTO transformation utilities
 */
export class DtoTransformer {
  /**
   * Transform User entity to UserResponseDto
   */
  static userToResponseDto(user: any): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    };
  }

  /**
   * Transform User entity to AuthResponseDto
   */
  static userToAuthResponseDto(user: any, token: string): AuthResponseDto {
    return {
      user: this.userToResponseDto(user),
      token
    };
  }

  /**
   * Create pagination object
   */
  static createPaginationDto(
    page: number,
    limit: number,
    total: number
  ): PaginationDto {
    const totalPages = Math.ceil(total / limit);
    return {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  }

  /**
   * Create paginated response
   */
  static createPaginatedResponse<T>(
    data: T[],
    pagination: PaginationDto
  ): PaginatedResponseDto<T> {
    return {
      data,
      pagination
    };
  }
}
