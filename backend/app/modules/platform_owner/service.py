from sqlalchemy.orm import Session

from app.modules.accounts.enums import AccountType
from app.modules.accounts.service import AccountService
from app.modules.customers.service import CustomerService
from app.modules.platform_owner.repository import PlatformOwnerRepository
from app.modules.platform_owner.schemas import (
    CreateSuperAdminRequest,
    CreateSuperAdminResponse,
    SuperAdminListItem,
    SuperAdminListResponse,
)
from app.modules.smtp_settings.service import SMTPSettingsService


class PlatformOwnerService:
  # Initialize the repository
    def __init__(self):
        self.customer_service = CustomerService()
        self.account_service = AccountService()
        self.smtp_service = SMTPSettingsService()
        self.platform_owner_repository = PlatformOwnerRepository()

    def create_super_admin(
        self,
        db: Session,
        request: CreateSuperAdminRequest,
    ) -> CreateSuperAdminResponse:
        try:
            # Step 1: Create Customer
            customer = self.customer_service.create_customer(
                db=db,
                customer=request.customer,
                commit=False,
            )

            # Step 2: Create Super Admin Account
            super_admin = self.account_service.create_account(
                db=db,
                customer=customer,
                account=request.account,
                account_type=AccountType.SUPER_ADMIN,
                commit=False,
            )

            # Step 3: Create SMTP Settings (Future)
            # self.smtp_service.create_smtp_settings(
            #     db=db,
            #     customer_id=customer.customer_id,
            #     smtp_settings=request.smtp_settings,
            #     commit=False,
            # )

            # Step 4: Commit Transaction
            db.commit()

            return CreateSuperAdminResponse(
                customer=customer,
                account=super_admin,
            )

        except Exception:
            db.rollback()
            raise
          
          
    def get_super_admins(
        self,
        db: Session,
    ) -> SuperAdminListResponse:
        results = self.platform_owner_repository.get_super_admins(db=db)

        super_admins = [
            SuperAdminListItem(
                account_id=account.account_id,
                customer_id=customer.customer_id,
                company_name=customer.company_name,
                company_short_name=customer.company_short_name,
                first_name=account.first_name,
                last_name=account.last_name,
                email=account.email,
                status=account.status,
                created_at=account.created_at,
            )
            for account, customer in results
        ]

        return SuperAdminListResponse(
            super_admins=super_admins,
        )