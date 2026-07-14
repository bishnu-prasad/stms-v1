"""
ClickHouse Connection

Purpose:
- Creates the ClickHouse client.
- Provides a reusable connection for analytics queries.
- Used for dashboards, reports, and historical telemetry analytics.

Unlike PostgreSQL, ClickHouse does not use SQLAlchemy ORM or Sessions.
A single client instance is sufficient for communicating with the server.
"""

import clickhouse_connect

from app.core.settings import settings


client = clickhouse_connect.get_client(
    host=settings.clickhouse_host,
    port=settings.clickhouse_port,
    username=settings.clickhouse_username,
    password=settings.clickhouse_password,
    database=settings.clickhouse_database,
)