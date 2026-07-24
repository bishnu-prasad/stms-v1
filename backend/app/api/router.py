from fastapi import APIRouter

from app.modules.auth.api.routes import router as auth_router
from app.modules.customers.api.routes import router as customer_router
from app.modules.smtp_settings.api.routes import router as smtp_settings_router
from app.modules.platform_owner.api.routes import router as platform_owner_router

api_router = APIRouter()

api_router.include_router(customer_router)
api_router.include_router(smtp_settings_router)
api_router.include_router(auth_router)
api_router.include_router(platform_owner_router)