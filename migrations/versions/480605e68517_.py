"""empty message

Revision ID: 480605e68517
Revises: 7ef62abb90ce
Create Date: 2025-05-17 00:46:38.841035

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '480605e68517'
down_revision = '7ef62abb90ce'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('device_status', schema=None) as batch_op:
        batch_op.alter_column('port_status',
               existing_type=mysql.VARCHAR(length=45),
               type_=mysql.JSON(),
               existing_nullable=True)

    with op.batch_alter_table('monitor_log', schema=None) as batch_op:
        batch_op.alter_column('port_status',
               existing_type=mysql.VARCHAR(length=45),
               type_=mysql.JSON(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('monitor_log', schema=None) as batch_op:
        batch_op.alter_column('port_status',
               existing_type=mysql.JSON(),
               type_=mysql.VARCHAR(length=45),
               existing_nullable=True)

    with op.batch_alter_table('device_status', schema=None) as batch_op:
        batch_op.alter_column('port_status',
               existing_type=mysql.JSON(),
               type_=mysql.VARCHAR(length=45),
               existing_nullable=True)

    # ### end Alembic commands ###
