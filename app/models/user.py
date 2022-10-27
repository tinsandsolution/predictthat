from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    funds = db.Column(db.Float, nullable=False, server_default="1000")

    #relationships
    markets = db.relationship("Market",back_populates="manager" )
    positions = db.relationship("Position", back_populates="user")
    sellOrders = db.relationship("SellOrder", back_populates="user")
    buyOrders = db.relationship("BuyOrder", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def some_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            # 'email': self.email,
            'funds' : self.funds
        }


    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'funds' : self.funds
        }
