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
    goodMarkets = [
        Market(manager_id='1', image_url='https://i.imgur.com/dJoFZMa.png', short_title='A/a Employees Union', title='Will the A/a employees vote to unionize by January 1, 2022?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
        Market(manager_id='1', image_url='https://i.imgur.com/UVCdHta.png', short_title='August Student Deferred', title='Will at least one student in the August Cohort take a deferral on their week 20 assessment?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
        Market(manager_id='1', image_url='https://i.imgur.com/EQA5B9D.png', short_title='Etsy Clone Frequency', title='Will the August Cohort present at least 5 clones of Etsy for their group project?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
        Market(manager_id='1', image_url='https://i.imgur.com/0OYvHMJ.png', short_title='ASOIF Finishes', title='Will George R. R. Martin die before the final book of A Song Of Ice And Fire is published?', description='Confirmation of this will be determined by a WSJ, NYT, or CNBC article. Borrowed from KrisMoore at Metaculus.'),
        Market(manager_id='1', image_url='https://i.imgur.com/kNiZ5r8.png', short_title='Online Poker Dead by 2031', title='Will online poker be dead on January 1, 2031?', description='This is entirely subjective, don\'t bet on this. Borrowed from AvrahamEisenberg at Metaculus'),
        Market(manager_id='1', image_url='https://i.imgur.com/vU5aSaq.png', short_title='Kalshi CFTC Approval', title='Will Kalshi get CFTC approval by January 1, 2023?', description='Confirmation of this will be determined by a WSJ, NYT, or CNBC article. '),
        Market(manager_id='2', image_url='https://i.imgur.com/DcmarU0.png', short_title='Costco Combo Price Hike', title='Will Costco raise the price of its hot dog and soda combo before 2025?', description='Confirmation of this will be determined by a WSJ, NYT, or CNBC article. Borrowed from Jgalt at Metaculus'),
        Market(manager_id='2', image_url='https://i.imgur.com/1alRxRY.png', short_title='Yasamine Cruz Passing', title='Will Yasamine Cruz pass the group project assessment on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
        Market(manager_id='2', image_url='https://i.imgur.com/Ogdbtyx.png', short_title='Matt Hutter Passing', title='Will Matt Hutter pass the capstone project on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
        Market(manager_id='2', image_url='https://i.imgur.com/Xsh4lDn.png', short_title='Lara Duong Passing', title='Will Lara pass the capstone project on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
    ]

    markets = [
        Market(manager_id='1', image_url='https://i.imgur.com/MVNpjMV.png', is_in_play = True, short_title='An Bui Passing', title='Will An Bui pass the capstone project on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
        Market(manager_id='2', image_url='https://i.imgur.com/Xsh4lDn.png', is_in_play = True, short_title='Lara Hired', title='Will Lara have a job that pays more than $50k a year by February 2, 2023?', description='Confirmation of this will be determined by a screenshot of Standard Duong\'s slack message.'),
        Market(manager_id='1', image_url='https://i.imgur.com/n9nndWD.png', is_in_play = True, short_title='Elon Musk A/a CEO', title='Will Elon Musk be CEO of A/a by January 31, 2022?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
        Market(manager_id='2', image_url='https://i.imgur.com/sGBZpe5.png', is_in_play = True, short_title='Hans Niemann Admission', title='Will Hans Niemann admit to cheating on an over-the-board game before 2024?', description='Confirmation of this will be determined by a WSJ, NYT, or CNBC article. '),
        Market(manager_id='1', image_url='https://i.imgur.com/dJoa.png', short_title='Maliha Omar Capstone', title='Will Maliha Omar pass the capstone assessment on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
        Market(manager_id='1', image_url='https://i.imgur.com/71JyDg1.png', short_title='Benjamin Lau Capstone', title='Will Benjamin Lau pass the capstone assessment on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
        Market(manager_id='1', image_url='https://i.imgur.com/qfvTjbP.png', short_title='Justin Rife Capstone', title='Will Justin Rife pass the capstone assessment on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
        Market(manager_id='1', image_url='https://i.imgur.com/PjB3FyS.png', short_title='Randy Chang Capstone', title='Will Randy Chang pass the capstone assessment on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
        Market(manager_id='2', image_url='https://i.imgur.com/cMQ1Als.png', short_title='Justin H Capstone', title='Will Justin H pass the capstone assessment on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
        Market(manager_id='2', image_url='https://i.imgur.com/ZIOljX6.png', short_title='Yen Nguyen Capstone', title='Will Yen Nguyen pass the capstone assessment on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
        Market(manager_id='2', image_url='https://i.imgur.com/hSbJPHG.png', short_title='Keanen B Capstone', title='Will Keanen B pass the capstone assessment on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
        Market(manager_id='3', image_url='https://i.imgur.com/Uaaaaq03eZJ.png', short_title='Tom Bluher Capstone', title='Will Tom Bluher pass the capstone assessment on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
        Market(manager_id='3', image_url='https://i.imgur.com/EDNXCgs.png', short_title='Will Marett Capstone', title='Will Will Marett pass the capstone assessment on the first try?', description='Confirmation of this will be determined by a screenshot of a slack message from at least one TA'),
    ]

    for market in goodMarkets:
        index = randint(4,len(markets))
        markets.insert(index, market)

    for market in markets: db.session.add(market)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_markets():
    db.session.execute('TRUNCATE markets RESTART IDENTITY CASCADE;')
    db.session.commit()
