from app.models import db, BuyOrder, SellOrder, Market

# Adds a demo user, you can add other users here if you want
def seed_orders():
    # user_id
    # market_id
    # quantity
    # price
    # quantity_filled
    # is_fulfilled
    # order1 = BuyOrder(user_id='1', market_id = '1', quantity = "23", price = "0.33", quantity_filled = "5", is_fulfilled = False)
    # order2 = BuyOrder(user_id='2', market_id = '1', quantity = "121", price = "0.44", quantity_filled = "25", is_fulfilled = False)
    # order3 = BuyOrder(user_id='3', market_id = '1', quantity = "41", price = "0.45", quantity_filled = "13", is_fulfilled = False)

    order4 = SellOrder(user_id='1', market_id = '1', quantity = "10", price = "0.65", quantity_filled = "3", is_fulfilled = False)
    order5 = SellOrder(user_id='2', market_id = '1', quantity = "30", price = "0.50", quantity_filled = "2", is_fulfilled = False)
    order6 = SellOrder(user_id='3', market_id = '1', quantity = "10", price = "0.55", quantity_filled = "1", is_fulfilled = False)

    market = Market.query.filter_by(id='1').first()
    market.is_in_play = True


    # db.session.add(order1)
    # db.session.add(order2)
    # db.session.add(order3)
    db.session.add(order4)
    db.session.add(order5)
    db.session.add(order6)




    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_orders():
    db.session.execute('TRUNCATE sellorders RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE buyorders RESTART IDENTITY CASCADE;')
    db.session.commit()
