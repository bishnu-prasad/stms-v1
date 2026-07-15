from pydantic import BaseModel , ConfigDict
from datetime import datetime



class CustomerBase(BaseModel):
    company_short_name: str
    company_name: str
    status: str



class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(BaseModel):
    company_short_name: str | None = None
    company_name: str | None = None
    status: str | None = None


class CustomerResponse(CustomerBase):
    customer_id: int
    customer_code: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)