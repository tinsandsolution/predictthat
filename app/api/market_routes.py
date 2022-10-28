from turtle import pos
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Market, Position, SellOrder
from ..forms.market_forms import MakeMarketForm, MakeSharesForm, ResolveMarketForm
import sys

market_routes = Blueprint('markets', __name__)
# print(f"fasdfasdfdsafasdfds\n\n\n\n\n")

@market_routes.route('')
def markets():
    # print(f"blah\n\n\n\n")
    # print(f"market routes\n\n\n\n\n")
    markets = Market.query.all()
    return {'markets': [market.to_dict() for market in markets]}


@market_routes.route('',  methods=['POST'])
@login_required
def makeMarket():
    # print("blah")

    manager_id = current_user.id
    form = MakeMarketForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    market = Market()
    form.populate_obj(market)
    market.manager_id = manager_id

    db.session.add(market)
    db.session.commit()

    # print(request.cookies,f"\n\n\n\n")
    return { "market" : market.to_dict()}

@market_routes.route('/<int:id>',  methods=['PUT'])
@login_required
def modifyMarket(id):
    # print("blah")

    form = MakeMarketForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    market = Market.query.filter_by(id=id).first()
    form.populate_obj(market)

    db.session.add(market)
    db.session.commit()

    # print(request.cookies,f"\n\n\n\n")
    return { "market" : market.to_dict()}

@market_routes.route('/<int:id>',  methods=['DELETE'])
@login_required
def deleteMarket(id):
    # print("blah")

    market = Market.query.filter_by(id=id).first()

    db.session.delete(market)
    db.session.commit()

    # print(request.cookies,f"\n\n\n\n")
    return { "Market" : "Market Deleted Successfully"}

@market_routes.route('/makepairs',  methods=['POST'])
@login_required
def makePairs():
    user_id = current_user.id
    form = MakeSharesForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    position = Position()
    form.populate_obj(position)
    position.user_id = user_id

    userPosition = Position.query.filter_by(user_id=user_id, market_id=position.market_id).first()
    if userPosition is None:
        db.session.add(position)
    else:
        userPosition.yes_shares += position.yes_shares
        userPosition.no_shares += position.yes_shares

    user = User.query.filter_by(id=user_id).first()
    market = Market.query.filter_by(id=position.market_id).first()
    market.is_in_play = True
    user.funds = user.funds - position.yes_shares

    db.session.commit()

    return { "New User Funds" : user.funds }, 200

@market_routes.route('/resolve',  methods=['POST'])
@login_required
def resolveMarket():
    user_id = current_user.id
    form = ResolveMarketForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    uh_market = Market()
    form.populate_obj(uh_market)

    market = Market.query.filter_by(id=uh_market.market_id).first()
    market.is_open = uh_market.is_open
    market.outcome_yes = uh_market.outcome_yes

    db.session.commit()

    settlePositions(uh_market.market_id,uh_market.outcome_yes)

    return { "Success" : "Market Has Resolved Successfully, and positions have been settled." }, 200

def settlePositions(market_id, outcome_yes):
    # so we need to close all relevant positions, which involves querying all the positions
    positions = Position.query.filter_by(market_id = market_id).all()

    # now we basically need to iterate through this list
    for position in positions:
        # we're going to grab three things, user_id, yes_shares, no_shares
        user_id = position.user_id
        yes_shares = position.yes_shares
        no_shares = position.no_shares

        user = User.query.filter_by(id= user_id).first()
        if outcome_yes: user.funds + yes_shares
        else: user.funds + no_shares

        db.session.delete(position)
        pass

    # and then we need to close orders
    sellOrders = SellOrder.query.filter_by(market_id = market_id).all()
    for sellOrder in sellOrders:
        user_id = sellOrder.user_id
        is_yes = False
        if outcome_yes: is_yes = True

        if sellOrder.is_yes == is_yes:
            user = User.query.filter_by(id= user_id).first()
            user.funds = user.funds + sellOrder.quantity - sellOrder.quantity_filled

        db.session.delete(sellOrder)

    db.session.commit()
    return None


# @user_routes.route('/<int:id>/bankroll')
# @login_required
# def users(id):
#     user = User.query.get(id)
#     return user.to_dict()
