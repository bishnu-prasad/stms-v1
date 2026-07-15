"""update account type enum

Revision ID: bc6b543309ba
Revises: 1e706901fc2d
Create Date: 2026-07-14 15:46:47.198020
"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "bc6b543309ba"
down_revision: Union[str, Sequence[str], None] = "1e706901fc2d"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("ALTER TYPE accounttype ADD VALUE 'PLATFORM_OWNER';")


def downgrade() -> None:
    # PostgreSQL does not support removing enum values directly.
    # Downgrade is intentionally left empty.
    pass