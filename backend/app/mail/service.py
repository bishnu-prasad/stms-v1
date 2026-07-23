
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from sqlalchemy.orm import Session

from app.core.settings import settings
from pathlib import Path
from app.modules.smtp_settings.service import SMTPSettingsService

# Mail Service
# Responsible for sending application emails.
#
# Flow:
# Auth Service
#      ↓
# MailService
#      ↓
# Load the customer's SMTP configuration from the database.
#      ↓
# Build the SMTP connection dynamically.
#      ↓
# Send the email using FastAPI-Mail.
#
# This service contains only email-related logic and does not generate
# business data such as reset tokens or URLs. Those responsibilities remain
# in the calling module (for example, the Auth Service).


class MailService:
    # Responsible for sending application emails.
    #
    # This service handles only email delivery.
    # Business operations such as generating tokens,
    # building URLs, or validating users are handled
    # by the calling service.


    async def send_password_reset_email(
        self,
        db: Session,
        customer_id: int,
        email: str,
        reset_url: str,
    ) -> None:
        # Send a password reset email using the customer's
        # active SMTP configuration stored in the database.
        # Retrieve the active SMTP configuration for the customer.
        smtp_service = SMTPSettingsService(db)
        smtp_settings = smtp_service.get_smtp_settings(
            customer_id=customer_id,
        )
        
        # Build the SMTP connection using the customer's configuration.
        connection_config = ConnectionConfig(
            MAIL_USERNAME=smtp_settings.smtp_username,
            MAIL_PASSWORD=smtp_settings.smtp_password,
            MAIL_FROM=smtp_settings.from_email,
            MAIL_FROM_NAME=smtp_settings.from_name,
            MAIL_SERVER=smtp_settings.smtp_host,
            MAIL_PORT=smtp_settings.smtp_port,
            MAIL_STARTTLS=smtp_settings.smtp_security.value == "TLS",
            MAIL_SSL_TLS=smtp_settings.smtp_security.value == "SSL",
            VALIDATE_CERTS=settings.mail_validate_certs,
        )
        
        fast_mail = FastMail(connection_config)
        template_path = (
        Path(__file__).parent
        / "templates"
        / "reset_password.html"
    )

        html_body = (
            template_path.read_text(encoding="utf-8")
            .replace("{{ reset_link }}", reset_url)
        )
        
        
        message = MessageSchema(
            subject="Reset Your STMS Password",
            recipients=[email],
            body=html_body,
            subtype=MessageType.html,
        )
        await fast_mail.send_message(message)