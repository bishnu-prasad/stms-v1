from __future__ import annotations
from datetime import datetime
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from app.modules.customers.models import Customer
    
from app.db.base import Base
from sqlalchemy import BigInteger, ForeignKey, String, Text, Enum, DateTime
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
    
    
    first_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )
    
    last_name:Mapped[str] = mapped_column(
        String(100),
        nullable=False, 
    )

    parent_account_id: Mapped[int | None] = mapped_column(
        BigInteger,
        ForeignKey("accounts.account_id"),
        nullable=True,
    )

    parent_account: Mapped["Account | None"] = relationship(
        "Account",
        remote_side="Account.account_id",
        foreign_keys=[parent_account_id],
        back_populates="child_accounts",
    )

    child_accounts: Mapped[list["Account"]] = relationship(
        "Account",
        foreign_keys=[parent_account_id],
        back_populates="parent_account",
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
    reset_password_token_hash: Mapped[str | None] = mapped_column(
        String(64),
        nullable=True,
    )

    reset_password_token_expires_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
    )
    account_type:Mapped[AccountType] = mapped_column(
          Enum(AccountType),
          nullable=False,
    )
    
    status: Mapped[AccountStatus] = mapped_column(
        Enum(AccountStatus),
        nullable=False,
    )
    mobile_no : Mapped[str | None] = mapped_column(
          String (20),
          nullable=True,

    )
    timezone: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="Asia/Kolkata",
    )

    language: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="en",
    )

    date_format: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="DD/MM/YYYY",
    )

    # TODO (V2): Add dashboard_type_id when supporting multiple dashboard layouts per account type.
    # For V1, dashboard selection is determined by account_type.
    # dashboard_type_id: Mapped[int | None] = mapped_column(
    #     BigInteger,
    #     ForeignKey("dashboard_types.id"),
    #     nullable=True,
    # )

    # TODO (V2): Add role_id when the RBAC (Roles & Permissions) module is implemented.
    # role_id: Mapped[int | None] = mapped_column(
    #     BigInteger,
    #     ForeignKey("roles.role_id"),
    #     nullable=True,
    # )

    # TODO (V2): Add location_id when the Location Hierarchy module is implemented.
    # location_id: Mapped[int | None] = mapped_column(
    #     BigInteger,
    #     ForeignKey("location_hierarchy.id"),
    #     nullable=True,
    # )

    two_factor_enabled: Mapped[bool] = mapped_column(
        nullable=False,
        default=False,
    )

    is_rtl: Mapped[bool] = mapped_column(
        nullable=False,
        default=False,
    )

    created_by: Mapped[int | None] = mapped_column(
        BigInteger,
        ForeignKey("accounts.account_id"),
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=datetime.utcnow,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    last_login_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    # TODO (V2): Enable when the RBAC (Roles & Permissions) module is implemented.
    # role: Mapped["Role | None"] = relationship(
    #     "Role",
    #     foreign_keys=[role_id],
    # )

    # TODO (V2): Enable when the Location Hierarchy module is implemented.
    # location: Mapped["LocationHierarchy | None"] = relationship(
    #     "LocationHierarchy",
    #     foreign_keys=[location_id],
    # )

    # TODO (V2): Enable when supporting multiple dashboard layouts per account type.
    # dashboard_type: Mapped["DashboardType | None"] = relationship(
    #     "DashboardType",
    #     foreign_keys=[dashboard_type_id],
    # )

    creator: Mapped["Account | None"] = relationship(
        "Account",
        foreign_keys=[created_by],
        remote_side="Account.account_id",
        back_populates="created_accounts",
    )

    created_accounts: Mapped[list["Account"]] = relationship(
        "Account",
        foreign_keys=[created_by],
        back_populates="creator",
    )