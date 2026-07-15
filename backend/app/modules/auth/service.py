from sqlalchemy.orm import Session

from jose import JWTError

from app.core.security import (
    create_access_token,
    decode_access_token,
    verify_password,
)

from app.modules.auth.repository import AuthRepository
from app.modules.auth.schemas import (
    CurrentUserResponse,
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
                "account_code": account.account_code,
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

    def get_current_user(
        self,
        db: Session,
        token: str,
    ) -> CurrentUserResponse:
        try:
            payload = decode_access_token(token)
        except JWTError:
            raise ValueError("Invalid or expired access token.")

        account_code = payload.get("account_code")

        if account_code is None:
            raise ValueError("Invalid access token.")

        account = self.repository.get_account_by_code(
            db=db,
            account_code=account_code,
        )

        if account is None:
            raise ValueError("Account not found.")

        return CurrentUserResponse(
            account_code=account.account_code,
            username=account.username,
            email=account.email,
            account_type=account.account_type.value,
            customer_name=account.customer.company_name,
        )