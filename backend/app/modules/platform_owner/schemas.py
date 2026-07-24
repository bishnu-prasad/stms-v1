from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr

from app.modules.accounts.enums import AccountStatus
from app.modules.accounts.schemas import (
    AccountCreate,
    AccountResponse,
)
from app.modules.customers.schemas import (
    CustomerCreate,
    CustomerResponse,
)


class CreateSuperAdminRequest(BaseModel):
    customer: CustomerCreate
    account: AccountCreate


class CreateSuperAdminResponse(BaseModel):
    customer: CustomerResponse
    account: AccountResponse


class SuperAdminListItem(BaseModel):
    account_id: int
    customer_id: int

    company_name: str
    company_short_name: str

    first_name: str
    last_name: str
    email: EmailStr

    status: AccountStatus
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SuperAdminListResponse(BaseModel):
    super_admins: list[SuperAdminListItem]