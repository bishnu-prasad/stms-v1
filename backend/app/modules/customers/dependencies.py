
# Customer module dependencies.
# Provides reusable FastAPI dependencies that can be shared across other modules.
# These dependencies resolve customer-related objects before the request reaches the route handler.

from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.modules.customers.models import Customer
from app.modules.customers.service import CustomerService


# Retrieves the customer using the business customer code.
def get_customer_by_code(
    customer_code: str,
    db: Session = Depends(get_db),
) -> Customer:
    customer_service = CustomerService()

    return customer_service.get_customer_by_code(
        db=db,
        customer_code=customer_code,
    )