from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Market, Position
from ..forms.market_forms import MakeMarketForm, MakeSharesForm
import sys

market_routes = Blueprint('markets', __name__)
# print(f"fasdfasdfdsafasdfds\n\n\n\n\n")

@market_routes.route('')
def markets():
    # print(f"blah\n\n\n\n")
    print(f"market routes\n\n\n\n\n")
    markets = Market.query.all()
    return {'markets': [market.to_dict() for market in markets]}


@market_routes.route('',  methods=['POST'])
@login_required
def makeMarket():
    print("blah")

    manager_id = current_user.id
    form = MakeMarketForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    market = Market()
    form.populate_obj(market)
    market.manager_id = manager_id

    db.session.add(market)
    db.session.commit()

    print(request.cookies,f"\n\n\n\n")
    return { "market" : market.to_dict()}

@market_routes.route('/makepairs',  methods=['POST'])
@login_required
def makePairs():
    print(f"dsfasdfdsfasdfs\n\n\n\n\n", flush=True)

    user_id = current_user.id
    form = MakeSharesForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # userPosition = Position.query.filter_by(user_id=user_id).first()
    # print(userPosition,f"\n\n\n\n\n\n")
    position = Position()
    form.populate_obj(position)
    position.user_id = user_id

    # print(position.no_shares,f"\n\n\n\n\n")
    user = User.query.filter_by(id=user_id).first()
    # print(user)
    user.funds = user.funds - position.no_shares
    # print(f"\n\n\n\n\n")



    db.session.add(position)
    db.session.commit()

    # print(request.cookies,f"\n\n\n\n")
    return { "New User Funds" : user.funds }, 200


# @user_routes.route('/<int:id>/bankroll')
# @login_required
# def users(id):
#     user = User.query.get(id)
#     return user.to_dict()
