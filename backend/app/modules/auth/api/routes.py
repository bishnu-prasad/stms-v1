from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session


from app.db.dependencies import get_db
from app.modules.auth.schemas import (
    CurrentUserResponse,
    LoginRequest,
    LoginResponse,
)
from app.modules.auth.service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

auth_service = AuthService()

security = HTTPBearer()


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