"""adjust replies and parent

Revision ID: fe73f82858d1
Revises: dc8540b5a430
Create Date: 2023-03-22 13:39:12.421912

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fe73f82858d1'
down_revision = 'dc8540b5a430'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('tweets_parent_tweet_id_fkey', 'tweets', type_='foreignkey')
    op.create_foreign_key(None, 'tweets', 'tweets', ['parent_tweet_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tweets', type_='foreignkey')
    op.create_foreign_key('tweets_parent_tweet_id_fkey', 'tweets', 'tweets', ['parent_tweet_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###