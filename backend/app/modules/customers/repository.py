from sqlalchemy.orm import Session

from app.modules.customers.models import Customer
from app.modules.customers.schemas import CustomerCreate

class CustomerRepository:
    def create_customer(
        self,
        db: Session,
        customer: CustomerCreate,
    ) -> Customer:
        db_customer = Customer(
            customer_code=customer.customer_code,
            company_name=customer.company_name,
            status=customer.status,
        )
        

        db.add(db_customer)
        db.commit()
        db.refresh(db_customer)
        
        return db_customer
      
    
      
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