from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
# from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Market, Position

class MakeMarketForm(FlaskForm):
    # manager_id
    # image_url
    # short_title
    # title
    # description

    # manager_id = StringField('manager_id')
    image_url = StringField('image_url')
    short_title = StringField('short_title')
    title = StringField('title')
    description = StringField('description')

class MakeSharesForm(FlaskForm):
    # market_id
    # yes_shares
    # no_shares

    market_id = IntegerField('market_id')
    yes_shares = IntegerField('yes_shares')
    no_shares = IntegerField('no_shares')



# def user_exists(form, field):
#     # Checking if user exists
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')
