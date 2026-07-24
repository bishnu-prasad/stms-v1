from sqlalchemy.orm import Session

from app.modules.accounts.enums import AccountType
from app.modules.accounts.models import Account
from app.modules.customers.models import Customer

class PlatformOwnerRepository:
    # Retrieves all Super Admin accounts for the Platform Owner dashboard.
    def get_super_admins(
        self,
        db: Session,
    ):
        return (
            db.query(Account, Customer)
            .join(
                Customer,
                Account.customer_id == Customer.customer_id,
            )
            .filter(
                Account.account_type == AccountType.SUPER_ADMIN,
            )
            .order_by(
                Account.created_at.desc(),
            )
            .all()
        )