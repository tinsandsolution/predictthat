from app.models import db, Market
import datetime
from random import randint

def random_future_date():
    date = datetime.datetime.today()
    dayChange = randint(20,100)
    delta = datetime.timedelta(days=dayChange)
    return date + delta


# Adds a demo user, you can add other users here if you want
def seed_markets():
    # manager_id
    # image_url
    # short_title
    # title
    # description
    market1 = Market(manager_id='1', image_url='https://i.imgur.com/dJoFZMa.png', short_title='A/a Employees Union', title='Will the A/a employees vote to unionize by January 1, 2022?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA')
    market2 = Market(manager_id='1', image_url='https://i.imgur.com/UVCdHta.png', short_title='August Student Deferred', title='Will at least one student in the August Cohort take a deferral on their week 20 assessment?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA')
    market3 = Market(manager_id='1', image_url='https://i.imgur.com/n9nndWD.png', short_title='Elon Musk A/a CEO', title='Will Elon Musk be CEO of A/a by January 31, 2022?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA')
    market4 = Market(manager_id='1', image_url='https://i.imgur.com/EQA5B9D.png', short_title='Etsy Clone Frequency', title='Will the August Cohort present at least 5 clones of Etsy for their group project?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA')
    market5 = Market(manager_id='1', image_url='https://i.imgur.com/0OYvHMJ.png', short_title='ASOIF Finishes', title='Will George R. R. Martin die before the final book of A Song Of Ice And Fire is published?', description='Confirmation of this will be determined by a WSJ, NYT, or CNBC article. Borrowed from KrisMoore at Metaculus.')
    market6 = Market(manager_id='1', image_url='https://i.imgur.com/kNiZ5r8.png', short_title='Online Poker Dead by 2031', title='Will online poker be dead on January 1, 2031?', description='This is entirely subjective, don\'t bet on this. Borrowed from AvrahamEisenberg at Metaculus')
    market7 = Market(manager_id='1', image_url='https://i.imgur.com/vU5aSaq.png', short_title='Kalshi CFTC Approval', title='Will Kalshi get CFTC approval by January 1, 2023?', description='Confirmation of this will be determined by a WSJ, NYT, or CNBC article. ')
    market8 = Market(manager_id='2', image_url='https://i.imgur.com/Xsh4lDn.png', short_title='Standard Hired', title='Will Standard have a job that pays more than $50k a year by February 2, 2023?', description='Confirmation of this will be determined by a screenshot of Standard Duong\'s slack message.')
    market9 = Market(manager_id='2', image_url='https://i.imgur.com/DcmarU0.png', short_title='Costco Combo Price Hike', title='Will Costco raise the price of its hot dog and soda combo before 2025?', description='Confirmation of this will be determined by a WSJ, NYT, or CNBC article. Borrowed from Jgalt at Metaculus')
    market10 = Market(manager_id='2', image_url='https://i.imgur.com/sGBZpe5.png', short_title='Hans Niemann Admission', title='Will Hans Niemann admit to cheating on an over-the-board game before 2024?', description='Confirmation of this will be determined by a WSJ, NYT, or CNBC article. ')
    market11 = Market(manager_id='2', image_url='https://i.imgur.com/1alRxRY.png', short_title='Yasamine Cruz Passing', title='Will Yasamine Cruz pass the group project assessment on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA')
    market12 = Market(manager_id='2', image_url='https://i.imgur.com/Ogdbtyx.png', short_title='Matt Hutter Passing', title='Will Matt Hutter pass the capstone project on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA')
    market13 = Market(manager_id='2', image_url='https://i.imgur.com/MVNpjMV.png', is_in_play = True, short_title='An Bui Passing', title='Will An Bui pass the capstone project on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA')
    market14 = Market(manager_id='2', image_url='https://i.imgur.com/Xsh4lDn.png', short_title='Standard Duong Passing', title='Will Standard pass the capstone project on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA')

    db.session.add(market13)
    db.session.add(market8)
    db.session.add(market3)
    db.session.add(market10)


    db.session.add(market1)
    db.session.add(market2)
    # db.session.add(market3)
    db.session.add(market4)
    db.session.add(market5)
    db.session.add(market6)
    db.session.add(market7)
    # db.session.add(market8)
    db.session.add(market9)
    # db.session.add(market10)
    db.session.add(market11)
    db.session.add(market12)
    # db.session.add(market13)
    db.session.add(market14)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_markets():
    db.session.execute('TRUNCATE markets RESTART IDENTITY CASCADE;')
    db.session.commit()
