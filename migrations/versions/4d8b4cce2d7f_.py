"""empty message

Revision ID: 4d8b4cce2d7f
Revises: c089e5a29b4b
Create Date: 2025-05-17 20:03:28.619238

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '4d8b4cce2d7f'
down_revision = 'c089e5a29b4b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('group', schema=None) as batch_op:
        batch_op.add_column(sa.Column('group_created_at', sa.DateTime(), nullable=True))
        batch_op.add_column(sa.Column('num_of_devices', sa.Integer(), nullable=True))
        batch_op.alter_column('group_name',
               existing_type=mysql.VARCHAR(length=255),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('group', schema=None) as batch_op:
        batch_op.alter_column('group_name',
               existing_type=mysql.VARCHAR(length=255),
               nullable=True)
        batch_op.drop_column('num_of_devices')
        batch_op.drop_column('group_created_at')

    # ### end Alembic commands ###
