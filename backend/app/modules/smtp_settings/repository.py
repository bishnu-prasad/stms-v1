

from sqlalchemy.orm import Session 

from app.modules.smtp_settings.models import CustomerSMTPSettings
from app.modules.smtp_settings.schemas import( SMTPSettingsCreate, SMTPSettingsUpdate,
)

class SMTPSettingsRepository:
    """
    Repository responsible for all database operations related to
    Customer SMTP Settings.

    Why?
    - Centralizes all SQLAlchemy queries.
    - Keeps business logic out of the repository.
    - Makes the service layer easier to test and maintain.
    """

    def __init__(self, db: Session):
        """
        Initialize the repository with a database session.

        Why?
        - Every repository method uses the same SQLAlchemy session.
        - The service layer injects the session instead of creating one.
        """
        self.db = db
        
# Retrieves SMTP settings for the specified customer.   
    def get_by_customer_id(
          self,
          customer_id: int,
      ) -> CustomerSMTPSettings | None:
          """
          Retrieve SMTP settings for a specific customer.

          Why?
          - Each customer owns exactly one SMTP configuration.
          - The service layer uses this method to check whether
            SMTP settings already exist before creating or updating them.
          """

          return (
              self.db.query(CustomerSMTPSettings)
              .filter(CustomerSMTPSettings.customer_id == customer_id)
              .first()
          )
      # Creates a new SMTP configuration for the specified customer.
    def create(
        self,
        customer_id: int,
        smtp_settings: SMTPSettingsCreate,
        commit: bool = True,
    ) -> CustomerSMTPSettings:
        """
        Create and save SMTP settings for a customer.
        """

        db_smtp_settings = CustomerSMTPSettings(
            customer_id=customer_id,
            **smtp_settings.model_dump(),
        )

        self.db.add(db_smtp_settings)
        if commit:
            self.db.commit()
            self.db.refresh(db_smtp_settings)
        else:
            self.db.flush()
            self.db.refresh(db_smtp_settings)

        return db_smtp_settings
      
    # Updates the SMTP configuration for the specified customer.
    def update(
        self,
        smtp_settings: CustomerSMTPSettings,
        smtp_settings_data: SMTPSettingsUpdate,
    ) -> CustomerSMTPSettings:
        """
        Update an existing SMTP configuration.
        """

        for field, value in smtp_settings_data.model_dump().items():
            setattr(smtp_settings, field, value)

        self.db.commit()
        self.db.refresh(smtp_settings)

        return smtp_settings