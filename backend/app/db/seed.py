from sqlalchemy.orm import Session

from app.common.id_generator import generate_public_id

from app.modules.customers.models import Customer
from app.modules.accounts.models import Account
from app.modules.accounts.enums import (
    AccountType,
    AccountStatus,
)
from app.core.security import get_password_hash
from app.modules.smtp_settings.models import CustomerSMTPSettings
from app.modules.smtp_settings.enums import SMTPSecurity
from app.core.settings import settings

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
                first_name="Platform",
                last_name="Owner",
                timezone="Asia/Kolkata",
                language="en",
                date_format="DD/MM/YYYY",
                two_factor_enabled=False,
                is_rtl=False,
            )

            db.add(platform_owner)
            db.commit()
            db.refresh(platform_customer)
            db.refresh(platform_owner)

            print("✅ Platform Owner created successfully.")
        else:
            print("✅ Platform Owner already exists.")

        # Create default SMTP configuration for Platform Owner if not exists
        smtp_settings = (
            db.query(CustomerSMTPSettings)
            .filter(CustomerSMTPSettings.customer_id == platform_customer.customer_id)
            .first()
        )

        if smtp_settings is None:
            smtp_settings = CustomerSMTPSettings(
                customer_id=platform_customer.customer_id,
                smtp_host=settings.mail_server,
                smtp_port=settings.mail_port,
                smtp_username=settings.mail_username,
                smtp_password=settings.mail_password,
                from_email=settings.mail_from,
                from_name=settings.mail_from_name,
                smtp_security=SMTPSecurity.SSL,
                is_active=True,
            )

            db.add(smtp_settings)
            db.commit()
            db.refresh(smtp_settings)

            print("✅ Platform SMTP settings created successfully.")
        else:
            print("✅ Platform SMTP settings already exist.")
    except Exception:
        db.rollback()
        raise