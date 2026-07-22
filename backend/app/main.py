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
from fastapi.middleware.cors import CORSMiddleware

import app.db.models

from app.api.router import api_router
from app.core.settings import settings

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.app_name}",
        "version": settings.app_version,
        "environment": settings.app_env,
        "debug": settings.debug,
    }