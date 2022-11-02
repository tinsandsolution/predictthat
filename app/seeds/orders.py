from app.models import db, SellOrder, Market, Position
import random
# Adds a demo user, you can add other users here if you want

def forAMarket(market_id,odds):
    if odds <= 3: odds = 4
    if odds >= 97: odds = 96
    newOrders = []

    if market_id > 2:
        position1 = Position(user_id='1', market_id = market_id, yes_shares = "1", no_shares = "1")
        position2 = Position(user_id='2', market_id = market_id, yes_shares = "1", no_shares = "1")
        position3 = Position(user_id='3', market_id = market_id, yes_shares = "1", no_shares = "1")
        db.session.add(position1)
        db.session.add(position2)
        db.session.add(position3)
        db.session.commit()

    for x in range(0,10):
        user_id = str(random.randint(1,3))
        quantity = str(random.randint(2,60))
        quantity_filled = str(0)
        is_yes = random.choice([True, False])
        price = "0.50"


        partially_filled = random.choice([True, False])
        if partially_filled:
            quantity_filled = str(random.randint(1,int(quantity)-1))

        if is_yes:
            delta = random.randint(-3,3)
            price = "0." + properCents(odds+delta)
        else:
            delta = random.randint(-3,3)
            price = "0." + properCents(100 - odds + delta)

        newOrders.append(SellOrder(user_id=user_id, market_id = market_id, quantity = quantity, price = price, quantity_filled = quantity_filled, is_yes = is_yes))
    return newOrders



def properCents(number):
    strN = str(number)
    if len(strN) == 1: return "0" + strN
    else: return str(number)

def seed_orders():
    orders = [
        SellOrder(user_id='1', market_id = '1', quantity = "23", price = "0.99", quantity_filled = "5", is_yes = True),
        SellOrder(user_id='2', market_id = '1', quantity = "121", price = "0.96", quantity_filled = "25", is_yes = True),
        SellOrder(user_id='3', market_id = '1', quantity = "41", price = "0.95", quantity_filled = "13", is_yes = True),
        SellOrder(user_id='3', market_id = '1', quantity = "1", price = "0.92", quantity_filled = "0", is_yes = True),

        SellOrder(user_id='1', market_id = '1', quantity = "10", price = "0.11", quantity_filled = "3", is_yes = False),
        SellOrder(user_id='2', market_id = '1', quantity = "30", price = "0.13", quantity_filled = "2", is_yes = False),
        SellOrder(user_id='3', market_id = '1', quantity = "10", price = "0.12", quantity_filled = "1", is_yes = False),
    ]

    orders.extend(forAMarket(2,95))
    orders.extend(forAMarket(3,5))
    orders.extend(forAMarket(4,4))
    for order in orders: db.session.add(order)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_orders():
    db.session.execute('TRUNCATE sellorders RESTART IDENTITY CASCADE;')
    # db.session.execute('TRUNCATE buyorders RESTART IDENTITY CASCADE;')
    db.session.commit()
