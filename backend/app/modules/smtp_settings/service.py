"""
SMTP Settings Service

Purpose:
- Implements the business logic for managing SMTP settings.
- Coordinates between the API layer and the repository layer.
- Ensures business rules are enforced before database operations.
"""

from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.modules.smtp_settings.repository import SMTPSettingsRepository
from app.modules.smtp_settings.schemas import (
    SMTPSettingsCreate,
    SMTPSettingsUpdate,
)

class SMTPSettingsService:
    """
    Service responsible for managing SMTP settings.

    Why?
    - Contains business rules.
    - Delegates database operations to the repository.
    - Keeps routes thin and focused on HTTP handling.
    """
    
    def __init__(self, db: Session):
        """
        Initialize the service with a database session.
        """
        self.repository = SMTPSettingsRepository(db)
        
    # Creates SMTP settings for the specified customer.
    def create_smtp_settings(
        self,
        customer_id: int,
        smtp_settings: SMTPSettingsCreate,
    ):
        # Ensure only one SMTP configuration exists per customer.
        existing_smtp_settings = self.repository.get_by_customer_id(
            customer_id
        )
        if existing_smtp_settings:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="SMTP settings already exist for this customer.",
            )
        return self.repository.create(
          customer_id=customer_id,
          smtp_settings=smtp_settings,
        )
        
    # Retrieves SMTP settings for the specified customer.
    def get_smtp_settings(
        self,
        customer_id: int,
    ):
        smtp_settings = self.repository.get_by_customer_id(
            customer_id
        )

        if not smtp_settings:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="SMTP settings not found for this customer.",
            )

        return smtp_settings

    # Updates SMTP settings for the specified customer.
    def update_smtp_settings(
        self,
        customer_id: int,
        smtp_settings: SMTPSettingsUpdate,
    ):
        # Ensure SMTP settings exist before attempting an update.
        existing_smtp_settings = self.repository.get_by_customer_id(
            customer_id
        )
        if not existing_smtp_settings:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="SMTP settings not found for this customer.",
            )
        # Persist the updated SMTP settings.
        return self.repository.update(
            smtp_settings=existing_smtp_settings,
            smtp_settings_data=smtp_settings,
        )