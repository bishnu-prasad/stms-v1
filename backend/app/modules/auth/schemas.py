"""
Authentication Schemas

Purpose:
- Defines all request and response models used by the Authentication module.
- Provides type validation for incoming API requests and outgoing API responses.

Responsibilities:
- Validate client request data.
- Define the structure of API responses.
- Keep the API contract consistent between frontend and backend.

This file does NOT:
- Contain business logic.
- Access the database.
- Create or verify JWTs.

When to modify this file:
- Add a new authentication request model.
- Add a new authentication response model.
- Update the API contract for an authentication endpoint.
"""

from pydantic import BaseModel , EmailStr , Field 


 # Login Request Schema
 # Used by the POST /auth/login endpoint.
 # Validates the user's login credentials received from the frontend.
class LoginRequest(BaseModel):
    identifier: str
    password: str


 # Login Response Schema
 # Returned after successful authentication.
 # Contains user information along with the access and refresh tokens.
class LoginResponse(BaseModel):
    success: bool
    username: str
    account_type: str
    customer_name: str
    access_token: str
    refresh_token: str
    token_type: str


 # Refresh Token Request Schema
 # Used by the POST /auth/refresh endpoint.
 # Receives the refresh token from the frontend to issue a new access token.
class RefreshTokenRequest(BaseModel):
    refresh_token: str


 # Refresh Token Response Schema
 # Returned after a valid refresh token is verified.
 # Contains a newly generated access token for continued authentication.
class RefreshTokenResponse(BaseModel):
    access_token: str
    token_type: str
    
    
# Forgot Password Request Schema
# Used by the POST /auth/forgot-password endpoint.
# Accepts the registered email address to initiate the password reset process.
class ForgotPasswordRequest(BaseModel):
    email: EmailStr = Field(
        ...,
        description="Registered email address of the account.",
    )


# Forgot Password Response Schema
# Returned after processing a password reset request.
# Always returns a generic message to prevent email enumeration.
class ForgotPasswordResponse(BaseModel):
    message: str


# Reset Password Request Schema
# Used by the POST /auth/reset-password endpoint.
# Accepts the reset token and the user's new password.
class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(
        ...,
        min_length=8,
        max_length=128,
    )


# Reset Password Response Schema
# Returned after a successful password reset.
class ResetPasswordResponse(BaseModel):
    message: str


 # Current User Response Schema
 # Returned by the GET /auth/me endpoint.
 # Contains the authenticated user's profile information.
class CurrentUserResponse(BaseModel):
    account_code: str
    username: str
    email: str | None
    account_type: str
    customer_name: str