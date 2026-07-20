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

from fastapi import APIRouter, Depends, HTTPException, Request, Response
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

security = HTTPBearer(auto_error=False)


 # Login Endpoint
 # Authenticates the user using email/mobile and password.
 # Returns an access token and refresh token after successful authentication.
@router.post(
    "/login",
    response_model=LoginResponse,
)
def login(
    response: Response,
    login_data: LoginRequest,
    db: Session = Depends(get_db),
):
    result = auth_service.login(
        db=db,
        login_data=login_data,
    )

    response.set_cookie(
        key="access_token",
        value=result.access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        path="/",
    )

    response.set_cookie(
        key="refresh_token",
        value=result.refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        path="/",
    )

    return result
    
    
 # Refresh Token Endpoint
 # Accepts a valid refresh token and issues a new access token.
 # Used when the current access token has expired.
@router.post(
    "/refresh",
    response_model=RefreshTokenResponse,
)
def refresh_token(
    request: Request,
    response: Response,
    refresh_data: RefreshTokenRequest | None = None,
    db: Session = Depends(get_db),
):
    refresh_token_value = None

    if refresh_data is not None:
        refresh_token_value = refresh_data.refresh_token

    if not refresh_token_value:
        refresh_token_value = request.cookies.get("refresh_token")

    if not refresh_token_value:
        raise HTTPException(
            status_code=401,
            detail="Refresh token not provided.",
        )

    result = auth_service.refresh_access_token(
        db=db,
        refresh_data=RefreshTokenRequest(refresh_token=refresh_token_value),
    )

    response.set_cookie(
        key="access_token",
        value=result.access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        path="/",
    )

    return result


# Logout Endpoint
# Clears the authentication cookies from the browser.
@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        path="/",
    )

    response.delete_cookie(
        key="refresh_token",
        path="/",
    )

    return {
        "message": "Logged out successfully."
    }

# Current User Endpoint
 # Returns the authenticated user's profile.
 # Requires a valid access token in the Authorization header.
@router.get(
    "/me",
    response_model=CurrentUserResponse,
)
def get_current_user(
    request: Request,
    credentials: HTTPAuthorizationCredentials | None = Depends(security),
    db: Session = Depends(get_db),
):
    token = None

    if credentials is not None:
        token = credentials.credentials
    else:
        token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(
            status_code=401,
            detail="Authentication credentials were not provided.",
        )
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