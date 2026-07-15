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
    ) -> Customer:
        existing_customer = self.repository.get_customer_by_company_short_name(
            db=db,
            company_short_name=customer.company_short_name,
        )

        if existing_customer:
            raise ValueError("Company short name already exists.")

        customer_code = generate_public_id("CUS")

        return self.repository.create_customer(
            db=db,
            customer=customer,
            customer_code=customer_code,
        )