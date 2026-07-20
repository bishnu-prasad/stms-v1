"""
Authentication Service

Purpose:
- Contains all business logic for the Authentication module.
- Acts as the bridge between the API routes and the database repository.

Responsibilities:
- Authenticate users during login.
- Verify passwords.
- Generate access and refresh tokens.
- Refresh expired access tokens.
- Retrieve the currently authenticated user's information.
- Coordinate with the repository to read account data.

This file does NOT:
- Define HTTP routes.
- Execute raw database queries.
- Define request or response schemas.

Those responsibilities belong to:
- routes.py      -> Handles HTTP requests and responses.
- repository.py -> Performs database operations.
- schemas.py    -> Defines request and response models.

When to modify this file:
- Add or change authentication business rules.
- Add a new authentication feature.
- Update login, refresh token, logout, password reset, or user validation logic.
- Change how authentication decisions are made.

Think of this file as the 'brain' of the Authentication module. Every authentication-related decision should be made here before interacting with the database or returning a response.
"""

from sqlalchemy.orm import Session

from jose import JWTError

from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_access_token,
    verify_password,
    get_password_hash,
)

from app.modules.auth.repository import AuthRepository
from app.mail.service import MailService
from app.modules.auth.schemas import (
    CurrentUserResponse,
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
)
import hashlib
import secrets
from datetime import datetime, timedelta, UTC



class AuthService:

    def __init__(self):
        self.repository = AuthRepository()
        self.mail_service = MailService()

    def login(
        self,
        db: Session,
        login_data: LoginRequest,
    ) -> LoginResponse:

        account = self.repository.get_account_by_identifier(
            db=db,
            identifier=login_data.identifier,
        )

        if account is None:
            raise ValueError("Invalid email/mobile number or password.")

        if account.status.value != "ACTIVE":
            raise ValueError("Account is not active.")

        if not verify_password(
            login_data.password,
            account.password_hash,
        ):
            raise ValueError("Invalid email/mobile number or password.")

        access_token = create_access_token(
            {
                "sub": account.username,
                "account_code": account.account_code,
                "account_type": account.account_type.value,
            }
        )

        refresh_token = create_refresh_token(
            {
                "sub": account.username,
                "account_code": account.account_code,
                "account_type": account.account_type.value,
            }
        )

        return LoginResponse(
            success=True,
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer",
            username=account.username,
            account_type=account.account_type.value,
            customer_name=account.customer.company_name,
        )

    # Refresh Access Token
    # Verifies the refresh token and issues a new access token.
    # Used when the current access token has expired.
    def refresh_access_token(
        self,
        db: Session,
        refresh_data: RefreshTokenRequest,
    ) -> RefreshTokenResponse:
        try:
            payload = decode_access_token(
                refresh_data.refresh_token,
            )
        except JWTError:
            raise ValueError("Invalid or expired refresh token.")

        if payload.get("token_type") != "refresh":
            raise ValueError("Invalid refresh token.")

        account_code = payload.get("account_code")

        if account_code is None:
            raise ValueError("Invalid refresh token.")

        account = self.repository.get_account_by_code(
            db=db,
            account_code=account_code,
        )

        if account is None:
            raise ValueError("Account not found.")

        access_token = create_access_token(
            {
                "sub": account.username,
                "account_code": account.account_code,
                "account_type": account.account_type.value,
            }
        )

        return RefreshTokenResponse(
            access_token=access_token,
            token_type="bearer",
        )

    def get_current_user(
        self,
        db: Session,
        token: str,
    ) -> CurrentUserResponse:
        try:
            payload = decode_access_token(token)
        except JWTError:
            raise ValueError("Invalid or expired access token.")

        account_code = payload.get("account_code")

        if account_code is None:
            raise ValueError("Invalid access token.")

        account = self.repository.get_account_by_code(
            db=db,
            account_code=account_code,
        )

        if account is None:
            raise ValueError("Account not found.")

        return CurrentUserResponse(
            account_code=account.account_code,
            username=account.username,
            email=account.email,
            account_type=account.account_type.value,
            customer_name=account.customer.company_name,
        )

    # Initiate the forgot password process.
    # Generates a password reset token, stores its hash, and sends a reset email.
    async def forgot_password(
        self,
        db: Session,
        request: ForgotPasswordRequest,
    ) -> ForgotPasswordResponse:
        account = self.repository.get_account_by_email(
            db=db,
            email=request.email,
        )

        # Always return a generic response to prevent email enumeration.
        if account is None:
            return ForgotPasswordResponse(
                message="If an account with that email exists, a password reset link has been sent.",
            )

        # Generate a secure random password reset token.
        token = secrets.token_urlsafe(32)

        # Store only the SHA-256 hash of the token in the database.
        token_hash = hashlib.sha256(
            token.encode("utf-8")
        ).hexdigest()

        # Set the password reset token expiration time.
        expires_at = datetime.now(UTC) + timedelta(hours=1)

        # Save the hashed reset token and its expiration time.
        self.repository.save_password_reset_token(
            db=db,
            account=account,
            token_hash=token_hash,
            expires_at=expires_at,
        )

        # Generate the password reset URL.
        # The frontend will use this token to identify the password reset request.
        # TODO: Replace the base URL with a configuration value from settings.
        reset_url = (
            f"http://localhost:3000/reset-password?token={token}"
        )

        # Send the password reset email.
        await self.mail_service.send_password_reset_email(
            email=account.email,
            reset_url=reset_url,
        )
        return ForgotPasswordResponse(
            message="If an account with that email exists, a password reset link has been sent.",
        )

    # Reset the account password using a valid reset token.
    # Verifies the token, updates the password, and invalidates the reset token.
    def reset_password(
        self,
        db: Session,
        request: ResetPasswordRequest,
    ) -> ResetPasswordResponse:
        # Hash the reset token received from the frontend.
        token_hash = hashlib.sha256(
            request.token.encode("utf-8")
        ).hexdigest()

        # Find the account associated with the reset token.
        account = self.repository.get_account_by_reset_token_hash(
            db=db,
            token_hash=token_hash,
        )
        
        # Ensure the reset token is valid.
        if account is None:
            raise ValueError(
                "Invalid or expired reset password token."
            )
            
        # Ensure the reset token has not expired.
        if (
            account.reset_password_token_expires_at is None
            or account.reset_password_token_expires_at < datetime.now(UTC)
        ):
            raise ValueError(
                "Reset password token has expired."
            )
            
        # Hash the new password.
        password_hash = get_password_hash(
            request.new_password,
        )

        # Update the password and clear the reset token.
        self.repository.reset_password(
            db=db,
            account=account,
            password_hash=password_hash,
        )

        # Return a success response.
        return ResetPasswordResponse(
            message="Password reset successfully.",
        )