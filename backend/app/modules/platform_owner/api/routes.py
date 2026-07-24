from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.modules.platform_owner.schemas import (
    CreateSuperAdminRequest,
    CreateSuperAdminResponse,
    SuperAdminListResponse,
)
from app.modules.platform_owner.service import PlatformOwnerService

router = APIRouter(
    prefix="/platform-owner",
    tags=["Platform Owner"],
)

platform_owner_service = PlatformOwnerService()


@router.post(
    "/create-super-admin",
    response_model=CreateSuperAdminResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_super_admin(
    request: CreateSuperAdminRequest,
    db: Session = Depends(get_db),
) -> CreateSuperAdminResponse:
    return platform_owner_service.create_super_admin(
        db=db,
        request=request,
    )


@router.get(
    "/super-admins",
    response_model=SuperAdminListResponse,
    status_code=status.HTTP_200_OK,
)
def get_super_admins(
    db: Session = Depends(get_db),
) -> SuperAdminListResponse:
    return platform_owner_service.get_super_admins(
        db=db,
    )