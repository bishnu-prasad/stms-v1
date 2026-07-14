"""
Application Settings

Purpose:
- Loads application configuration from environment variables (.env).
- Centralizes all configurable values used throughout the application.

Examples:
- Application Name
- Database Configuration
- JWT Settings
- Email Configuration

Using centralized settings avoids hardcoded values and simplifies
configuration management across different environments.
"""
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
    
    # ClickHouse
    clickhouse_host: str
    clickhouse_port: int
    clickhouse_database: str
    clickhouse_username: str
    clickhouse_password: str

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

    @property
    def database_url(self) -> str:
        return (
            f"postgresql+psycopg://"
            f"{self.database_user}:"
            f"{self.database_password}@"
            f"{self.database_host}:"
            f"{self.database_port}/"
            f"{self.database_name}"
        )
        
settings = Settings()