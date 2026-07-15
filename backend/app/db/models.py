"""
ORM Model Registry

Purpose:
- Imports all SQLAlchemy ORM models.
- Ensures SQLAlchemy registers every mapper before the application starts.

IMPORTANT:
Whenever a new model is created, import it here.
"""

from app.modules.accounts.models import Account
from app.modules.customers.models import Customer