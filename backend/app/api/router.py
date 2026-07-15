from fastapi import APIRouter

from app.modules.auth.api.routes import router as auth_router
from app.modules.customers.api.routes import router as customer_router

api_router = APIRouter()

api_router.include_router(customer_router)
api_router.include_router(auth_router)