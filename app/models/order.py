from .db import db

class SellOrder(db.Model):
    __tablename__ = 'sellorders'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer,db.ForeignKey("users.id", ondelete="CASCADE"))
    market_id = db.Column(db.Integer,db.ForeignKey("markets.id", ondelete="CASCADE"))
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity_filled = db.Column(db.Integer, server_default="0", nullable=False)
    is_fulfilled = db.Column(db.Boolean, server_default="false", nullable=False)

    #relationships
    user = db.relationship("User", back_populates="sellOrders")
    market = db.relationship("Market", back_populates="sellOrders", lazy=False)

    def to_dict(self):
        return {
            'id' : self.id,
            'user_id' : self.user_id,
            'user' : self.user.some_dict(),
            'market_id' : self.market_id,
            'market' : self.market.some_dict(),
            'quantity' : self.quantity,
            'price' : self.price,
            'quantity_filled' : self.quantity_filled,
            'is_fulfilled' : self.is_fulfilled,
        }

# class BuyOrder(db.Model):
#     __tablename__ = 'buyorders'

#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     user_id = db.Column(db.Integer,db.ForeignKey("users.id", ondelete="CASCADE"))
#     market_id = db.Column(db.Integer,db.ForeignKey("markets.id", ondelete="CASCADE"))
#     quantity = db.Column(db.Integer, nullable=False)
#     price = db.Column(db.Float, nullable=False)
#     quantity_filled = db.Column(db.Integer, server_default="0", nullable=False)
#     is_fulfilled = db.Column(db.Boolean, server_default="false", nullable=False)

#     #relationships
#     user = db.relationship("User", back_populates="buyOrders")
#     market = db.relationship("Market", back_populates="buyOrders", lazy=False)

#     def to_dict(self):
#         return {
#             'id' : self.id,
#             'user_id' : self.user_id,
#             'user' : self.user.some_dict(),
#             'market_id' : self.market_id,
#             'market' : self.market.some_dict(),
#             'quantity' : self.quantity,
#             'price' : self.price,
#             'quantity_filled' : self.quantity_filled,
#             'is_fulfilled' : self.is_fulfilled,
#         }
