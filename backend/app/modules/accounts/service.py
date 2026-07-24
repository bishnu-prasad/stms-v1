from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.common.id_generator import generate_public_id
from app.core.security import get_password_hash
from app.modules.accounts.enums import AccountType
from app.modules.accounts.models import Account
from app.modules.accounts.repository import AccountRepository
from app.modules.accounts.schemas import AccountCreate
from app.modules.customers.models import Customer


class AccountService:
    def __init__(self):
        self.repository = AccountRepository()

    def create_account(
        self,
        db: Session,
        customer: Customer,
        account: AccountCreate,
        account_type: AccountType,
        created_by: int | None = None,
        parent_account_id: int | None = None,
    ) -> Account:
        existing_username = self.repository.get_by_username(
            db=db,
            username=account.username,
        )

        if existing_username:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Username already exists.",
            )

        existing_email = self.repository.get_by_email(
            db=db,
            email=account.email,
        )

        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already exists.",
            )

        db_account = Account(
            account_code=generate_public_id("ACC"),
            customer_id=customer.customer_id,
            first_name=account.first_name,
            last_name=account.last_name,
            username=account.username,
            email=account.email,
            mobile_no=account.mobile_no,
            password_hash=get_password_hash(account.password),
            account_type=account_type,
            status=account.status,
            timezone=account.timezone,
            language=account.language,
            date_format=account.date_format,
            two_factor_enabled=account.two_factor_enabled,
            is_rtl=account.is_rtl,
            created_by=created_by,
            parent_account_id=parent_account_id,
        )

        return self.repository.create_account(
            db=db,
            account=db_account,
        )
