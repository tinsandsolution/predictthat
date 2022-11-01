from app.models import db, Position
import datetime
from random import randint


# Adds a demo user, you can add other users here if you want
def seed_rest():

    # we're going to iterate through 10 items.
    # we're going



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_rest():
    db.session.execute('TRUNCATE positions RESTART IDENTITY CASCADE;')
    db.session.commit()
