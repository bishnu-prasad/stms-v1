"""
Application Entry Point

Purpose:
- Initializes the FastAPI application.
- Registers application metadata.
- Defines the root API endpoints.
- Acts as the starting point of the backend server.

This file is executed when the FastAPI application starts.
"""
from fastapi import FastAPI

from app.core.settings import settings

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
)


@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.app_name}",
        "version": settings.app_version,
        "environment": settings.app_env,
        "debug": settings.debug,
    }