from pydantic import BaseModel

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