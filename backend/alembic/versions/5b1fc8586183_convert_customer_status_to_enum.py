"""Convert customer status to enum

Revision ID: 5b1fc8586183
Revises: eb451d262e15
Create Date: 2026-07-24 10:58:10.658722

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

customer_status_enum = sa.Enum(
    "ACTIVE",
    "INACTIVE",
    name="customerstatus",
)


# revision identifiers, used by Alembic.
revision: str = '5b1fc8586183'
down_revision: Union[str, Sequence[str], None] = 'eb451d262e15'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    """Upgrade schema."""

    customer_status_enum.create(op.get_bind(), checkfirst=True)

    op.alter_column(
        "customers",
        "status",
        existing_type=sa.VARCHAR(length=20),
        type_=customer_status_enum,
        existing_nullable=False,
        postgresql_using="status::customerstatus",
    )
    
    
def downgrade() -> None:
    """Downgrade schema."""

    op.alter_column(
        "customers",
        "status",
        existing_type=customer_status_enum,
        type_=sa.VARCHAR(length=20),
        existing_nullable=False,
        postgresql_using="status::text",
    )

    customer_status_enum.drop(op.get_bind(), checkfirst=True)