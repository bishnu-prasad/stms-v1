from sqlalchemy.orm import Session

from app.modules.customers.repository import CustomerRepository
from app.modules.customers.schemas import CustomerCreate
from app.modules.customers.models import Customer


class CustomerService:

    def __init__(self):
        self.repository = CustomerRepository()

    def create_customer(
        self,
        db: Session,
        customer: CustomerCreate,
    ) -> Customer:
        existing_customer = self.repository.get_customer_by_code(
            db=db,
            customer_code=customer.customer_code,
        )

        if existing_customer:
            raise ValueError("Customer code already exists.")

        return self.repository.create_customer(
            db=db,
            customer=customer,
        )