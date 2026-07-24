from sqlalchemy.orm import Session

from app.modules.accounts.models import Account


class AccountRepository:
    def create_account(
        self,
        db: Session,
        account: Account,
        commit: bool = True,
    ) -> Account:
        db.add(account)
        if commit:
            db.commit()
            db.refresh(account)
        else:
            db.flush()
            db.refresh(account)

        return account

    # Retrieves an account by username to validate duplicate usernames.
    def get_by_username(
        self,
        db: Session,
        username: str,
    ) -> Account | None:
        return (
            db.query(Account)
            .filter(Account.username == username)
            .first()
        )

    # Retrieves an account by email to validate duplicate email addresses.
    def get_by_email(
        self,
        db: Session,
        email: str,
    ) -> Account | None:
        return (
            db.query(Account)
            .filter(Account.email == email)
            .first()
        )
