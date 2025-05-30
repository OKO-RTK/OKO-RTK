"""empty message

Revision ID: 42b74f7784ea
Revises: 480605e68517
Create Date: 2025-05-17 00:57:42.092792

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '42b74f7784ea'
down_revision = '480605e68517'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('device_status', schema=None) as batch_op:
        batch_op.alter_column('port_status',
               existing_type=mysql.JSON(),
               type_=sa.String(length=45),
               existing_nullable=True)

    with op.batch_alter_table('monitor_log', schema=None) as batch_op:
        batch_op.alter_column('port_status',
               existing_type=mysql.JSON(),
               type_=sa.String(length=45),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('monitor_log', schema=None) as batch_op:
        batch_op.alter_column('port_status',
               existing_type=sa.String(length=45),
               type_=mysql.JSON(),
               existing_nullable=True)

    with op.batch_alter_table('device_status', schema=None) as batch_op:
        batch_op.alter_column('port_status',
               existing_type=sa.String(length=45),
               type_=mysql.JSON(),
               existing_nullable=True)

    # ### end Alembic commands ###
