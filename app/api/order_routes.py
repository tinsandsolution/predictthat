from turtle import pos
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Market, Position, SellOrder
# from ..forms.market_forms import MakeMarketForm, MakeSharesForm, ResolveMarketForm, OrderForm
import sys

order_routes = Blueprint('orders', __name__)

@order_routes.route('/<int:id>',  methods=['DELETE'])
@login_required
def deleteMarket(id):
    order = SellOrder.query.filter_by(id=id).first()

    to_credit = order.quantity - order.quantity_filled
    market_id = order.market_id
    user_id = current_user.id

    userPosition = Position.query.filter_by(user_id=user_id, market_id=market_id).first()

    if order.is_yes is True:
        userPosition.yes_shares += to_credit
    else:
        userPosition.no_shares += to_credit

    db.session.delete(order)
    db.session.commit()

    # print(request.cookies,f"\n\n\n\n")
    return { "Order" : "Order Deleted Successfully"}



# @order_routes.route('/<int:id>',  methods=['PUT'])
# @login_required
# def modifyMarket(id):
#     # print("blah")

#     form = MakeMarketForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     market = Market.query.filter_by(id=id).first()
#     form.populate_obj(market)

#     db.session.add(market)
#     db.session.commit()

#     # print(request.cookies,f"\n\n\n\n")
#     return { "market" : market.to_dict()}
