"""empty message

Revision ID: 02439a5d411f
Revises: 
Create Date: 2022-11-02 15:24:51.123677

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '02439a5d411f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('funds', sa.Float(), server_default='1000', nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('markets',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('manager_id', sa.Integer(), nullable=True),
    sa.Column('image_url', sa.String(length=255), nullable=False),
    sa.Column('short_title', sa.String(length=255), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=2000), nullable=False),
    sa.Column('expected_resolution_time', sa.DateTime(), nullable=True),
    sa.Column('is_open', sa.Boolean(), server_default='true', nullable=False),
    sa.Column('is_in_play', sa.Boolean(), server_default='false', nullable=False),
    sa.Column('yes_value', sa.Float(), server_default='0', nullable=False),
    sa.Column('no_value', sa.Float(), server_default='0', nullable=False),
    sa.Column('outcome_yes', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['manager_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('positions',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('market_id', sa.Integer(), nullable=True),
    sa.Column('yes_shares', sa.Integer(), nullable=False),
    sa.Column('no_shares', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['market_id'], ['markets.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('sellorders',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('market_id', sa.Integer(), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('quantity_filled', sa.Integer(), server_default='0', nullable=False),
    sa.Column('is_yes', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['market_id'], ['markets.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('sellorders')
    op.drop_table('positions')
    op.drop_table('markets')
    op.drop_table('users')
    # ### end Alembic commands ###
