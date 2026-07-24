from pydantic import BaseModel,EmailStr,Field

from app.modules.accounts.enums import AccountStatus


class AccountCreate(BaseModel):    

    # Basic Account Information
    first_name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="First name of the Account.",
    )
    last_name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Last name of the Account.",
    )
    username: str = Field(
        ...,
        min_length=3,
        max_length=150,
        description="Unique username used for login.",
    )
    email: EmailStr = Field(
        ...,
        description="Email address of the Account.",
    )
    mobile_no: str = Field(
        ...,
        min_length=10,
        max_length=20,
        description="Mobile number used for login and communication.",
    )
    password: str = Field(
        ...,
        min_length=8,
        description="Temporary password for the  Account.",
    )

    # Preferences
    status: AccountStatus = Field(
        ...,
        description="Initial account status selected .",
    )
    language: str = Field(
        default="en",
        max_length=20,
        description="Preferred language.",
    )
    timezone: str = Field(
        default="Asia/Kolkata",
        max_length=50,
        description="Preferred time zone.",
    )
    date_format: str = Field(
        default="DD/MM/YYYY",
        max_length=20,
        description="Preferred date format.",
    )
    two_factor_enabled: bool = Field(
        default=False,
        description="Enable or disable two-factor authentication.",
    )
    is_rtl: bool = Field(
        default=False,
        description="Whether the interface should use right-to-left layout.",
    )