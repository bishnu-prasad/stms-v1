from sqlalchemy.orm import Session

from app.common.id_generator import generate_public_id

from app.modules.customers.models import Customer
from app.modules.accounts.models import Account
from app.modules.accounts.enums import (
    AccountType,
    AccountStatus,
)
from app.core.security import get_password_hash

def seed_platform_owner(
    db: Session,
):
    try:
        platform_customer = (
            db.query(Customer)
            .filter(Customer.company_short_name == "PLATFORM")
            .first()
        )

        if platform_customer is None:
            platform_customer = Customer(
                customer_code=generate_public_id("CUS"),
                company_short_name="PLATFORM",
                company_name="Platform Owner",
                status="ACTIVE",
            )

            db.add(platform_customer)
            db.flush()

    

        platform_owner = (
            db.query(Account)
            .filter(Account.username == "owner")
            .first()
        )

        if platform_owner is None:
            platform_owner = Account(
                customer_id=platform_customer.customer_id,
                account_code=generate_public_id("ACC"),
                username="owner",
                password_hash=get_password_hash("Owner@123"),
                email="owner@stms.com",
                account_type=AccountType.PLATFORM_OWNER,
                status=AccountStatus.ACTIVE,
                mobile_no="9876543210",
            )

            db.add(platform_owner)
            db.commit()
            db.refresh(platform_customer)
            db.refresh(platform_owner)

            print("✅ Platform Owner created successfully.")
        else:
            print("✅ Platform Owner already exists.")
    except Exception:
        db.rollback()
        raise