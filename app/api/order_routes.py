from turtle import pos
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Market, Position, SellOrder
from ..forms.market_forms import EditOrderForm
import sys
import time
order_routes = Blueprint('orders', __name__)

@order_routes.route('/<int:id>',  methods=['DELETE'])
@login_required
def deleteOrder(id):
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



@order_routes.route('/<int:id>',  methods=['PUT'])
@login_required
def modifyOrder(id):
    form = EditOrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # so you can either change the price or the quantity of the order.
    # if you increase the price of the order, it's pretty simple - just modify it.
    # if you change the quantity of the order, you're going to have to do some math with some positions.

    order = SellOrder.query.filter_by(id=id).first()
    position = Position.query.filter_by(user_id = order.user_id, market_id = order.market_id).first()

    oldQuantity = order.quantity # say it's 5
    form.populate_obj(order)
    db.session.add(order)
    db.session.commit()

    order = SellOrder.query.filter_by(id=id).first()
    newQuantity = order.quantity # say it's 3

    delta = oldQuantity - newQuantity # so it's 2
    # we're going to add this delta to the current position
    if order.is_yes: position.yes_shares += delta
    else: position.no_shares += delta


    db.session.add(order)
    db.session.add(position)
    db.session.commit()

    return { "order" : order.to_dict()}


@order_routes.route('/<int:id>/fill',  methods=['PUT'])
@login_required
def fillOrder(id):
    # a few things get changed:
    # 1. the buyer's funds
    # 2. the buyer's positions
    # 3. the seller's funds
    # 4. the seller's positions'
    # 5. the order filled quantity

    # 5a. if the order is completely filled, it's deleted.


    # form = EditOrderForm()
    # form['csrf_token'].data = request.cookies['csrf_token']

    # # so you can either change the price or the quantity of the order.
    # # if you increase the price of the order, it's pretty simple - just modify it.
    # # if you change the quantity of the order, you're going to have to do some math with some positions.

    # order = SellOrder.query.filter_by(id=id).first()
    # position = Position.query.filter_by(user_id = order.user_id, market_id = order.market_id).first()

    # oldQuantity = order.quantity # say it's 5
    # form.populate_obj(order)
    # db.session.add(order)
    # db.session.commit()

    # order = SellOrder.query.filter_by(id=id).first()
    # newQuantity = order.quantity # say it's 3

    # delta = oldQuantity - newQuantity # so it's 2
    # # we're going to add this delta to the current position
    # if order.is_yes: position.yes_shares += delta
    # else: position.no_shares += delta


    # db.session.add(order)
    # db.session.add(position)
    # db.session.commit()

    # return { "order" : order.to_dict()}
    pass
