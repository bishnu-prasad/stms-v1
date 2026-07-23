from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.modules.smtp_settings.schemas import (
    SMTPSettingsCreate,
    SMTPSettingsUpdate,
    SMTPSettingsResponse,
)

from app.modules.smtp_settings.service import SMTPSettingsService
from app.modules.customers.dependencies import get_customer_by_code
from app.modules.customers.models import Customer

router = APIRouter(
    prefix="/customers/{customer_code}/smtp-settings",
    tags=["SMTP Settings"],
)

# Creates SMTP settings for the specified customer.
@router.post(
    "",
    response_model=SMTPSettingsResponse,
)
def create_smtp_settings(
    smtp_settings: SMTPSettingsCreate,
    customer: Customer = Depends(get_customer_by_code),
    db: Session = Depends(get_db),
):
    smtp_service = SMTPSettingsService(db)

    # Create SMTP settings using the internal customer ID.
    return smtp_service.create_smtp_settings(
        customer_id=customer.customer_id,
        smtp_settings=smtp_settings,
    )

# Retrieves SMTP settings for the specified customer.
@router.get(
    "",
    response_model=SMTPSettingsResponse,
)
def get_smtp_settings(
    customer: Customer = Depends(get_customer_by_code),
    db: Session = Depends(get_db),
):
    smtp_service = SMTPSettingsService(db)

    # Retrieve SMTP settings using the internal customer ID.
    return smtp_service.get_smtp_settings(
        customer_id=customer.customer_id,
    )

# Updates SMTP settings for the specified customer.
@router.put(
    "",
    response_model=SMTPSettingsResponse,
)
def update_smtp_settings(
    smtp_settings: SMTPSettingsUpdate,
    customer: Customer = Depends(get_customer_by_code),
    db: Session = Depends(get_db),
):
    smtp_service = SMTPSettingsService(db)

    # Update SMTP settings using the internal customer ID.
    return smtp_service.update_smtp_settings(
        customer_id=customer.customer_id,
        smtp_settings=smtp_settings,
    )