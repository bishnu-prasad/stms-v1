from pydantic import BaseModel


class LoginRequest(BaseModel):
    identifier: str
    password: str


class LoginResponse(BaseModel):
    success: bool
    username: str
    account_type: str
    customer_name: str
    access_token: str
    token_type: str


class CurrentUserResponse(BaseModel):
    account_code: str
    username: str
    email: str | None
    account_type: str
    customer_name: str