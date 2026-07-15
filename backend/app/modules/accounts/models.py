from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from app.modules.customers.models import Customer
    
from app.db.base import Base
from sqlalchemy import BigInteger , ForeignKey , String , Text, Enum
from sqlalchemy.orm import Mapped, mapped_column , relationship
from app.modules.accounts.enums import AccountStatus, AccountType

class Account(Base):
    __tablename__ = "accounts"

    account_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
    )

    account_code: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
    )

    customer_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("customers.customer_id"),
        nullable=False,
    )
    customer: Mapped["Customer"] = relationship(
    "Customer",
    back_populates="accounts",
)
    username: Mapped[str] = mapped_column(
          String(150),
          unique=True,
          nullable=False,
    )
    
    password_hash: Mapped[str] = mapped_column(
    Text,
    nullable=False,
)
    email: Mapped[str | None] = mapped_column(
    String(255),
    nullable=True,
)
    account_type:Mapped[AccountType] = mapped_column(
          Enum(AccountType),
          nullable=False,
    )
    
    status: Mapped[AccountStatus] = mapped_column(
    Enum(AccountStatus),
    nullable=False,
    default=AccountStatus.INACTIVE,
)
    mobile_no : Mapped[str | None] = mapped_column(
          String (20),
          nullable=True,

    )