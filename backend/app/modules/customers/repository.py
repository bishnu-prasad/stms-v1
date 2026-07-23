from sqlalchemy.orm import Session

from app.modules.customers.models import Customer
from app.modules.customers.schemas import CustomerCreate

class CustomerRepository:
    def create_customer(
        self,
        db: Session,
        customer: CustomerCreate,
        customer_code: str,
    ) -> Customer:
        db_customer = Customer(
            customer_code=customer_code,
            company_short_name=customer.company_short_name,
            company_name=customer.company_name,
            status=customer.status,
        )
        

        db.add(db_customer)
        db.commit()
        db.refresh(db_customer)
        
        return db_customer
      
    
      
    # Retrieves a customer by company short name to validate duplicate customers.
    def get_customer_by_company_short_name(
      self,
      db: Session,
      company_short_name: str,
) -> Customer | None:
      return (
    db.query(Customer)
    .filter(Customer.company_short_name == company_short_name)
    .first()
)

    # Retrieves a customer by customer code for use in other modules (e.g., SMTP settings).
    def get_customer_by_code(
        self,
        db: Session,
        customer_code: str,
    ) -> Customer | None:
        return (
            db.query(Customer)
            .filter(Customer.customer_code == customer_code)
            .first()
        )