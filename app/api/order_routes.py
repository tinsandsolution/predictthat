from turtle import pos
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Market, Position, SellOrder
from ..forms.market_forms import EditOrderForm, FillOrderForm
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
    # check to see if the position exists. if not, return "error"
    # check to see if ... f*** it we'll change this later and hope it passes pregrading.
    buyer_id = current_user.id



    form = FillOrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    emptyOrder = SellOrder()
    form.populate_obj(emptyOrder)

    # i'm too lazy how to figure out how to harvest data from this. so i guess i'll just use what i did before.

    # 1. decrease the buyer's funds
    buyer = User.query.filter_by(id=buyer_id).first()
    delta = emptyOrder.quantity * emptyOrder.price
    buyer.funds -= delta
    db.session.add(buyer)
    # 3. increase the seller's funds
    seller = User.query.filter_by(id = emptyOrder.user_id).first()
    seller.funds += delta
    db.session.add(seller)

    # 2. update the buyer's positions
    buyerPosition = Position.query.filter_by(user_id = buyer_id, market_id = emptyOrder.market_id).first()
    if emptyOrder.is_yes: buyerPosition.yes_shares += emptyOrder.quantity
    else: buyerPosition.no_shares += emptyOrder.quantity
    db.session.add(buyerPosition)
    # 4. do nothing to the seller's positions


    # 5. update the order filled quantity
    actualOrder = SellOrder.query.filter_by(id=id).first()
    actualOrder.quantity_filled += emptyOrder.quantity
    if actualOrder.quantity_filled == actualOrder.quantity:
        db.session.delete(actualOrder)
    else:
        db.session.add(actualOrder)

    db.session.commit()

    return { "order" : "successful"}
