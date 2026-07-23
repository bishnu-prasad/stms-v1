from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from app.modules.accounts.models import Account
    from app.modules.smtp_settings.models import CustomerSMTPSettings
    
from datetime import datetime
from sqlalchemy import BigInteger, String, func , DateTime
from sqlalchemy.orm import Mapped, mapped_column , relationship

from app.db.base import Base


class Customer(Base):
    __tablename__ = "customers"

    customer_id: Mapped[int] = mapped_column(BigInteger,primary_key=True)
    
    customer_code: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
    )

    company_short_name: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
    )
    
    company_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
    
    customer_type_id: Mapped[int | None] = mapped_column()      
    
    status: Mapped[str] = mapped_column(
        String(20),
        default="INACTIVE",
        nullable=False,
    )
    
    created_at: Mapped[datetime] =        mapped_column(
      DateTime(timezone=True),
      server_default=func.now(),
  )

    updated_at: Mapped[datetime] = mapped_column(
      DateTime(timezone=True),
      server_default=func.now(),
      onupdate=func.now(),
  )
    
    accounts: Mapped[list["Account"]] = relationship(
    "Account",
    back_populates="customer",
)
    
    smtp_settings: Mapped["CustomerSMTPSettings"] = relationship(
    "CustomerSMTPSettings",
    back_populates="customer",
    uselist=False,
)