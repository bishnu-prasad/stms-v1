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