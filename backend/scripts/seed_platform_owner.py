"""
Platform Owner Seeder

Run:

uv run python scripts/seed_platform_owner.py
"""

from app.db.session import SessionLocal
from app.db.seed import seed_platform_owner


def main():
    db = SessionLocal()

    try:
        seed_platform_owner(db)
    finally:
        db.close()


if __name__ == "__main__":
    main()