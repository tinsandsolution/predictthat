from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Market, Position
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

    return { "Success" : "Market Has Resolved Successfully" }, 200


# @user_routes.route('/<int:id>/bankroll')
# @login_required
# def users(id):
#     user = User.query.get(id)
#     return user.to_dict()
