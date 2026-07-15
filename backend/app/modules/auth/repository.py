from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.modules.accounts.models import Account


class AuthRepository:

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