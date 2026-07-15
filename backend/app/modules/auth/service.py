from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    verify_password,
)

from app.modules.auth.repository import AuthRepository
from app.modules.auth.schemas import (
    LoginRequest,
    LoginResponse,
)


class AuthService:

    def __init__(self):
        self.repository = AuthRepository()

    def login(
        self,
        db: Session,
        login_data: LoginRequest,
    ) -> LoginResponse:

        account = self.repository.get_account_by_identifier(
            db=db,
            identifier=login_data.identifier,
        )

        if account is None:
            raise ValueError("Invalid email/mobile number or password.")

        if account.status.value != "ACTIVE":
            raise ValueError("Account is not active.")

        if not verify_password(
            login_data.password,
            account.password_hash,
        ):
            raise ValueError("Invalid email/mobile number or password.")

        access_token = create_access_token(
            {
                "sub": account.username,
                "account_type": account.account_type.value,
            }
        )

        return LoginResponse(
            success=True,
            access_token=access_token,
            token_type="bearer",
            username=account.username,
            account_type=account.account_type.value,
            customer_name=account.customer.company_name,
        )