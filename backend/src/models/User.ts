import { Role } from './enums';

/**
 * User entity interface based on Prisma schema
 */
export interface User {
  id: string;
  email: string;
  password: string;
  name: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User data without sensitive information (for API responses)
 */
export interface UserPublic {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User creation data
 */
export interface CreateUserData {
  email: string;
  password: string;
  name?: string;
  role?: Role;
}

/**
 * User update data
 */
export interface UpdateUserData {
  email?: string;
  name?: string;
  role?: Role;
}

/**
 * User model class with business logic
 */
export class UserModel {
  /**
   * Remove sensitive data from user object
   */
  static toPublic(user: User): UserPublic {
    const { password, ...publicUser } = user;
    return publicUser;
  }

  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   */
  static isValidPassword(password: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  /**
   * Check if user has admin role
   */
  static isAdmin(user: User | UserPublic): boolean {
    return user.role === Role.ADMIN;
  }

  /**
   * Check if user can perform admin actions
   */
  static canPerformAdminActions(user: User | UserPublic): boolean {
    return this.isAdmin(user);
  }

  /**
   * Generate user display name
   */
  static getDisplayName(user: User | UserPublic): string {
    return user.name || user.email.split('@')[0];
  }

  /**
   * Check if user profile is complete
   */
  static isProfileComplete(user: User | UserPublic): boolean {
    return !!(user.name && user.email);
  }

  /**
   * Get user creation date in readable format
   */
  static getFormattedCreatedDate(user: User | UserPublic): string {
    return user.createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
