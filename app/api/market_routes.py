from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Market
from ..forms.market_forms import MakeMarketForm


market_routes = Blueprint('markets', __name__)


@market_routes.route('')
def markets():
    markets = Market.query.all()
    return {'markets': [market.to_dict() for market in markets]}


@market_routes.route('',  methods=['POST'])
@login_required
def makeMarket():
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

# @user_routes.route('/<int:id>/bankroll')
# @login_required
# def users(id):
#     user = User.query.get(id)
#     return user.to_dict()
