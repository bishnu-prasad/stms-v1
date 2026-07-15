from pydantic import BaseModel , ConfigDict
from datetime import datetime



class CustomerBase(BaseModel):
    customer_code: str
    company_name: str
    status: str


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(BaseModel):
    customer_code: str | None = None
    company_name: str | None = None
    status: str | None = None


class CustomerResponse(CustomerBase):
    customer_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)