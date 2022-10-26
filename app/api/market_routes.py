from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Market

market_routes = Blueprint('markets', __name__)


@market_routes.route('')
def markets():
    markets = Market.query.all()
    return {'markets': [market.to_dict() for market in markets]}


# @market_routes.route('/<int:id>')
# @login_required
# def market(id):
#     markets = Market.query.all(manager_id=id)
#     return {'markets': [market.to_dict() for market in markets]}

# @user_routes.route('/<int:id>/bankroll')
# @login_required
# def users(id):
#     user = User.query.get(id)
#     return user.to_dict()
