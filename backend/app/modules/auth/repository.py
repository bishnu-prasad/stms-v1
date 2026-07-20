from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.modules.accounts.models import Account


class AuthRepository:

    # Retrieve an account using either the registered email address or mobile number.
    # Used during the login process to support multiple login identifiers.
    def get_account_by_identifier(
        self,
        db: Session,
        identifier: str,
    ) -> Account | None:
        return (
            db.query(Account)
            .filter(
                or_(
                    Account.email == identifier,
                    Account.mobile_no == identifier,
                )
            )
            .first()
        )

    # Retrieve an account using its unique account code.
    # Used to fetch the currently authenticated account details.
    def get_account_by_code(
        self,
        db: Session,
        account_code: str,
    ) -> Account | None:
        return (
            db.query(Account)
            .filter(Account.account_code == account_code)
            .first()
        )
        
    # Retrieve an account using the registered email address.
    # Used during the forgot password process to locate the account.
    def get_account_by_email(
        self,
        db: Session,
        email: str,
    ) -> Account | None:
        return (
            db.query(Account)
            .filter(Account.email == email)
            .first()
        )
        
        
        
    # Store the hashed password reset token and its expiration time.
    # The service layer generates the token, while the repository persists it.
    def save_password_reset_token(
        self,
        db: Session,
        account: Account,
        token_hash: str,
        expires_at,
    ) -> None:
        account.reset_password_token_hash = token_hash
        account.reset_password_token_expires_at = expires_at

        db.add(account)
        db.commit()
        db.refresh(account)
        
    # Retrieve an account using the hashed password reset token.
    # Used to validate the reset password request when the user opens the reset link.
    def get_account_by_reset_token_hash(
        self,
        db: Session,
        token_hash: str,
    ) -> Account | None:
        return (
            db.query(Account)
            .filter(Account.reset_password_token_hash == token_hash)
            .first()
        )
        
        
    # Update the account password and clear the password reset token.
# Called after the reset token has been successfully validated.
    def reset_password(
        self,
        db: Session,
        account: Account,
        password_hash: str,
    ) -> None:
        account.password_hash = password_hash
        account.reset_password_token_hash = None
        account.reset_password_token_expires_at = None

        db.add(account)
        db.commit()
        db.refresh(account)
        