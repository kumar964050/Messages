export const ERROR_MESSAGES = {
  // Authentication
  ALREADY_USER_EXIST: "This email already exists.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  UNAUTHORIZED_ACCESS: "You are not authorized to access this resource.",
  USER_NOT_FOUND: "User not found.",
  ACCOUNT_DISABLED: "Your account has been disabled. Please contact support.",
  TOKEN_EXPIRED: "Session expired. Please log in again.",
  TOKEN_INVALID: "Invalid authentication token.",
  TOKEN_MISSING: "Access denied. No token provided.",

  PASSWORD_MISMATCH: "Passwords do not match.",
  PASSWORD_TOO_WEAK:
    "Password must be at least 8 characters long and contain letters and numbers.",
  TEMP_PASSWORD_SENT:
    "A temporary password has been sent to your email. Use it to log in and reset your password.",

  // Message Errors
  MESSAGE_NOT_FOUND: "Message not found.",
  MESSAGE_SEND_FAILED: "Failed to send message. Please try again.",
  EMPTY_MESSAGE: "Message cannot be empty.",
  ATTACHMENT_TOO_LARGE: "Attachment size exceeds the allowed limit.",
  UNSUPPORTED_FILE_TYPE: "Unsupported file type.",

  // Chat Errors
  CHAT_NOT_FOUND: "Chat not found.",
  CHAT_CREATION_FAILED: "Failed to create a new chat.",
  CHAT_ACCESS_DENIED: "You are not a participant in this chat.",

  // User & Profile Errors
  PROFILE_UPDATE_FAILED: "Failed to update profile. Please try again.",
  INVALID_USERNAME: "Username must be between 3 and 16 characters.",
  INVALID_EMAIL: "Invalid email format.",
  USER_ALREADY_BLOCKED: "User is already blocked.",
  USER_NOT_BLOCKED: "User is not blocked.",

  // Notification Errors
  NOTIFICATION_NOT_FOUND: "Notification not found.",

  // System & Server Errors
  SERVER_ERROR: "Something went wrong. Please try again later.",
  DATABASE_ERROR: "Database connection error.",
  RATE_LIMIT_EXCEEDED: "Too many requests. Please slow down.",
  INVALID_INPUT: "Invalid input. Please check your data.",
  PERMISSION_DENIED: "You do not have permission to perform this action.",
};
export const EMAIL_MESSAGES = {
  WELCOME_SUBJECT: "Welcome to Our Service!",
  WELCOME_BODY: (name: string) =>
    `<h1>Hello ${name},</h1><p>Welcome! We're excited to have you on board.</p>`,

  TEMPORARY_PASSWORD_SUBJECT: "Your Temporary Password for Login",
  TEMPORARY_PASSWORD_BODY: (tempPassword: string) => `
    <p>Hello,</p>
    <p>You have requested a password reset. Use the temporary password below to log in:</p>
    <h2 style="color: #ff6600;">${tempPassword}</h2>
    <p>This password will expire in 20 minutes. Please reset your password after logging in.</p>
    <p>If you did not request this, please ignore this email.</p>
    <br/>
    <p>Best regards,</p>
    <p><strong>Your Support Team</strong></p>`,
  RESET_PASSWORD_SUBJECT: "Reset Your Password",
  RESET_PASSWORD_BODY: (name: string, resetLink: string) =>
    `<h1>Hello ${name},</h1>
      <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
      <p>If you didn't request this, please ignore this email.</p>`,

  ACCOUNT_VERIFICATION_SUBJECT: "Verify Your Email",
  ACCOUNT_VERIFICATION_BODY: (name: string, verifyLink: string) =>
    `<h1>Hello ${name},</h1>
      <p>Please verify your email by clicking <a href="${verifyLink}">here</a>.</p>
      <p>If you didn't sign up, please ignore this email.</p>`,
  ACCOUNT_VERIFICATION:
    "You have been sent verification email to your email id",
};

export const SUCCESS_MESSAGES = {
  USER_REGISTERED: "User registered successfully.",
  LOGIN_SUCCESS: "Login successful.",
  LOGOUT_SUCCESS: "Logout successful.",
  PASSWORD_UPDATED: "Password updated successfully.",

  MESSAGE_SENT: "Message sent successfully.",
  MESSAGE_DELETED: "Message deleted successfully.",

  CHAT_CREATED: "Chat created successfully.",
  CHAT_DELETED: "Chat deleted successfully.",

  PROFILE_UPDATED: "Profile updated successfully.",
  USER_BLOCKED: "User has been blocked.",
  USER_UNBLOCKED: "User has been unblocked.",

  NOTIFICATION_READ: "Notification marked as read.",
  NOTIFICATION_DELETED: "Notification deleted.",

  ACTION_COMPLETED: "Action completed successfully.",
};
