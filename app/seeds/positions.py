from app.models import db, Position
import datetime
from random import randint


# Adds a demo user, you can add other users here if you want
def seed_positions():
    # manager_id
    # image_url
    # short_title
    # title
    # description
    position1 = Position(user_id='1', market_id = '1', yes_shares = "10", no_shares = "10")
    position2 = Position(user_id='2', market_id = '1', yes_shares = "100", no_shares = "50")
    position3 = Position(user_id='3', market_id = '1', yes_shares = "60", no_shares = "20")

    positions = [
        Position(user_id='1', market_id = '2', yes_shares = "10", no_shares = "10"),
        Position(user_id='2', market_id = '2', yes_shares = "10", no_shares = "10"),
        Position(user_id='3', market_id = '2', yes_shares = "10", no_shares = "10"),

        Position(user_id='1', market_id = '3', yes_shares = "10", no_shares = "10"),
        Position(user_id='2', market_id = '3', yes_shares = "10", no_shares = "10"),
        Position(user_id='3', market_id = '3', yes_shares = "10", no_shares = "10"),


        Position(user_id='1', market_id = '4', yes_shares = "10", no_shares = "10"),
        Position(user_id='2', market_id = '4', yes_shares = "10", no_shares = "10"),
        Position(user_id='3', market_id = '4', yes_shares = "10", no_shares = "10"),
    ]

    db.session.add(position1)
    db.session.add(position2)
    db.session.add(position3)

    for position in positions: db.session.add(position)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_positions():
    db.session.execute('TRUNCATE positions RESTART IDENTITY CASCADE;')
    db.session.commit()
