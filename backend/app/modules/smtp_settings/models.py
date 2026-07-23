from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.modules.customers.models import Customer

from app.db.base import Base
from app.modules.smtp_settings.enums import SMTPSecurity

from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    Enum,
    ForeignKey,
    Integer,
    String,
)

from sqlalchemy.orm import Mapped, mapped_column, relationship


class CustomerSMTPSettings(Base):
    __tablename__ = "customer_smtp_settings"

    smtp_setting_id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
    )

    customer_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey("customers.customer_id"),
        unique=True,
        nullable=False,
    )

    customer: Mapped["Customer"] = relationship(
        "Customer",
        back_populates="smtp_settings",
    )

    smtp_host: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    smtp_port: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    smtp_username: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    smtp_password: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    from_email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    from_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    smtp_security: Mapped[SMTPSecurity] = mapped_column(
        Enum(SMTPSecurity),
        nullable=False,
        default=SMTPSecurity.TLS,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
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