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
)

from app.modules.auth.repository import AuthRepository
from app.modules.auth.schemas import (
    CurrentUserResponse,
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
)


class AuthService:

    def __init__(self):
        self.repository = AuthRepository()

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