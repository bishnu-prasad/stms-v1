"""
SMTP Settings Pydantic Schemas

Purpose:
- Define the request and response models for the SMTP Settings APIs.
- Validate incoming client data before it reaches the service layer.
- Control what data is returned to the frontend.
"""
from pydantic import BaseModel, EmailStr

from app.modules.smtp_settings.enums import SMTPSecurity



class SMTPSettingsBase(BaseModel):
  """

    Base schema containing all common SMTP configuration fields.

    Why?

    - Prevents code duplication.

    - Shared by Create, Update, and Response schemas.

    """
    
  smtp_host: str
  smtp_port: int
  smtp_username: str
  smtp_password: str
  from_email: EmailStr
  from_name: str
  smtp_security: SMTPSecurity


class SMTPSettingsCreate(SMTPSettingsBase):
  """

    Schema used when creating SMTP settings.

    Why?

    - The client sends these fields when configuring SMTP

      for the first time.

    """
  pass
  
  
class SMTPSettingsUpdate(SMTPSettingsBase):
  """

    Schema used when updating existing SMTP settings.

    Why?

    - Reuses the same fields as the create schema because

      the API performs a full update of the SMTP configuration.

    """
  pass
  
class SMTPSettingsResponse(SMTPSettingsBase):
      """

    Schema returned to the frontend.

    Why?

    - Includes database-generated fields that the client

      should receive but never send in a request.

    """
      smtp_setting_id: int
      customer_id: int
      is_active: bool

      class Config:
          from_attributes = True