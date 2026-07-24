

from pydantic import BaseModel

from app.modules.accounts.schemas import AccountCreate
from app.modules.customers.schemas import CustomerCreate


class CreateSuperAdminRequest(BaseModel):
    customer: CustomerCreate
    account: AccountCreate