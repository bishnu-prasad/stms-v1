from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )

    # Application
    app_name: str
    app_version: str
    app_env: str
    debug: bool

    # PostgreSQL
    database_host: str
    database_port: int
    database_name: str
    database_user: str
    database_password: str

    # JWT
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    # Email
    mail_username: str
    mail_password: str
    mail_from: str
    mail_port: int
    mail_server: str
    mail_starttls: bool
    mail_ssl_tls: bool


settings = Settings()