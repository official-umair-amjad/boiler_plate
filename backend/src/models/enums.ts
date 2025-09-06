/**
 * User roles enum
 */
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

/**
 * Authentication token types
 */
export enum TokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
  RESET_PASSWORD = 'reset_password',
  EMAIL_VERIFICATION = 'email_verification'
}

/**
 * HTTP status codes commonly used in the application
 */
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

/**
 * Error codes for API responses
 */
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}

/**
 * Validation constants
 */
export const ValidationConstants = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 255
} as const;

/**
 * JWT constants
 */
export const JWTConstants = {
  ACCESS_TOKEN_EXPIRY: '15m' as const,
  REFRESH_TOKEN_EXPIRY: '7d' as const,
  RESET_TOKEN_EXPIRY: '1h' as const,
  VERIFICATION_TOKEN_EXPIRY: '24h' as const
} as const;
