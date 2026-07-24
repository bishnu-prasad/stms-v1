from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.modules.customers.repository import CustomerRepository
from app.modules.customers.schemas import CustomerCreate
from app.modules.customers.models import Customer
from app.common.id_generator import generate_public_id


class CustomerService:

    def __init__(self):
        self.repository = CustomerRepository()

    def create_customer(
        self,
        db: Session,
        customer: CustomerCreate,
        commit: bool = True,
    ) -> Customer:
        existing_customer = self.repository.get_customer_by_company_short_name(
            db=db,
            company_short_name=customer.company_short_name,
        )

        if existing_customer:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Company short name already exists.",
            )

        customer_code = generate_public_id("CUS")

        db_customer = Customer(
            customer_code=customer_code,
            company_short_name=customer.company_short_name,
            company_name=customer.company_name,
            status=customer.status,
        )

        return self.repository.create_customer(
            db=db,
            customer=db_customer,
            commit=commit,
        )

    # Retrieves a customer by customer code for use in other modules.
    def get_customer_by_code(
        self,
        db: Session,
        customer_code: str,
    ) -> Customer:
        customer = self.repository.get_customer_by_code(
            db=db,
            customer_code=customer_code,
        )

        if not customer:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Customer not found.",
            )

        return customer