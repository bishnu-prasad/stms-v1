from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.modules.customers.schemas import (
    CustomerCreate,
    CustomerResponse,
)
from app.modules.customers.service import CustomerService

# TODO:
# Remove this endpoint once all organization onboarding
# is handled through workflow modules (Platform Owner,
# Super Admin, etc.).
router = APIRouter(
    prefix="/customers",
    tags=["Customers"],
)

customer_service = CustomerService()

@router.post(
    "/",
    response_model=CustomerResponse,
)
def create_customer(
    customer: CustomerCreate,
    db: Session = Depends(get_db),
) -> CustomerResponse:
    return customer_service.create_customer(
        db=db,
        customer=customer,
    )