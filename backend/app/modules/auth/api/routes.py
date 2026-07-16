"""
Authentication API Routes

Purpose:
- Defines all HTTP endpoints for the Authentication module.
- Receives client requests and forwards them to the AuthService.
- Returns the service response back to the client.

Responsibilities:
- Expose authentication APIs such as:
    - POST /auth/login
    - POST /auth/refresh
    - GET /auth/me
- Validate request and response models using Pydantic.
- Inject required dependencies (Database Session, HTTPBearer).
- Convert service exceptions into appropriate HTTP responses.

This file does NOT:
- Perform business logic.
- Verify passwords.
- Create or verify JWTs.
- Query the database directly.

Those responsibilities belong to the Service and Repository layers.

When to modify this file:
- Add a new authentication endpoint.
- Change an API route or HTTP method.
- Add or update route-level dependencies.
- Update request or response models for an endpoint.
"""

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session


from app.db.dependencies import get_db
from app.modules.auth.schemas import (
    CurrentUserResponse,
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
)
from app.modules.auth.service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

auth_service = AuthService()

security = HTTPBearer()


 # Login Endpoint
 # Authenticates the user using email/mobile and password.
 # Returns an access token and refresh token after successful authentication.
@router.post(
    "/login",
    response_model=LoginResponse,
)
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db),
):
    return auth_service.login(
        db=db,
        login_data=login_data,
    )
    
    
 # Refresh Token Endpoint
 # Accepts a valid refresh token and issues a new access token.
 # Used when the current access token has expired.
@router.post(
    "/refresh",
    response_model=RefreshTokenResponse,
)
def refresh_token(
    refresh_data: RefreshTokenRequest,
    db: Session = Depends(get_db),
):
    return auth_service.refresh_access_token(
        db=db,
        refresh_data=refresh_data,
    )
    
    
 # Current User Endpoint
 # Returns the authenticated user's profile.
 # Requires a valid access token in the Authorization header.
@router.get(
    "/me",
    response_model=CurrentUserResponse,
)
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials
    try:
        return auth_service.get_current_user(
            db=db,
            token=token,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=401,
            detail=str(exc),
        )