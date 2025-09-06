import { ValidationConstants } from './enums';

/**
 * Validation utility functions for models
 */
export class ValidationHelper {
  /**
   * Validate email format using RFC 5322 standard
   */
  static validateEmail(email: string): { isValid: boolean; error?: string } {
    if (!email) {
      return { isValid: false, error: 'Email is required' };
    }

    if (email.length > ValidationConstants.EMAIL_MAX_LENGTH) {
      return { isValid: false, error: `Email must not exceed ${ValidationConstants.EMAIL_MAX_LENGTH} characters` };
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Invalid email format' };
    }

    return { isValid: true };
  }

  /**
   * Validate password strength
   */
  static validatePassword(password: string): { isValid: boolean; error?: string } {
    if (!password) {
      return { isValid: false, error: 'Password is required' };
    }

    if (password.length < ValidationConstants.PASSWORD_MIN_LENGTH) {
      return { isValid: false, error: `Password must be at least ${ValidationConstants.PASSWORD_MIN_LENGTH} characters long` };
    }

    if (password.length > ValidationConstants.PASSWORD_MAX_LENGTH) {
      return { isValid: false, error: `Password must not exceed ${ValidationConstants.PASSWORD_MAX_LENGTH} characters` };
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one uppercase letter' };
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one lowercase letter' };
    }

    // Check for at least one digit
    if (!/\d/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one number' };
    }

    return { isValid: true };
  }

  /**
   * Validate name field
   */
  static validateName(name: string): { isValid: boolean; error?: string } {
    if (!name) {
      return { isValid: true }; // Name is optional
    }

    const trimmedName = name.trim();

    if (trimmedName.length < ValidationConstants.NAME_MIN_LENGTH) {
      return { isValid: false, error: `Name must be at least ${ValidationConstants.NAME_MIN_LENGTH} character long` };
    }

    if (trimmedName.length > ValidationConstants.NAME_MAX_LENGTH) {
      return { isValid: false, error: `Name must not exceed ${ValidationConstants.NAME_MAX_LENGTH} characters` };
    }

    // Check for valid characters (letters, spaces, hyphens, apostrophes)
    if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
      return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
    }

    return { isValid: true };
  }

  /**
   * Validate user ID format
   */
  static validateUserId(userId: string): { isValid: boolean; error?: string } {
    if (!userId) {
      return { isValid: false, error: 'User ID is required' };
    }

    // Validate CUID format (starts with 'c' followed by 24 alphanumeric characters)
    if (!/^c[a-z0-9]{24}$/.test(userId)) {
      return { isValid: false, error: 'Invalid user ID format' };
    }

    return { isValid: true };
  }

  /**
   * Sanitize string input
   */
  static sanitizeString(input: string): string {
    return input.trim().replace(/\s+/g, ' ');
  }

  /**
   * Normalize email (lowercase and trim)
   */
  static normalizeEmail(email: string): string {
    return email.toLowerCase().trim();
  }

  /**
   * Check if string contains only alphanumeric characters
   */
  static isAlphanumeric(str: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(str);
  }

  /**
   * Validate pagination parameters
   */
  static validatePagination(page?: number, limit?: number): { 
    isValid: boolean; 
    error?: string; 
    normalizedPage?: number; 
    normalizedLimit?: number; 
  } {
    const defaultPage = 1;
    const defaultLimit = 10;
    const maxLimit = 100;

    let normalizedPage = page || defaultPage;
    let normalizedLimit = limit || defaultLimit;

    if (normalizedPage < 1) {
      return { isValid: false, error: 'Page must be greater than 0' };
    }

    if (normalizedLimit < 1) {
      return { isValid: false, error: 'Limit must be greater than 0' };
    }

    if (normalizedLimit > maxLimit) {
      return { isValid: false, error: `Limit must not exceed ${maxLimit}` };
    }

    return { 
      isValid: true, 
      normalizedPage, 
      normalizedLimit 
    };
  }
}
