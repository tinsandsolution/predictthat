from .db import db

class Position(db.Model):
    __tablename__ = 'positions'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer,db.ForeignKey("users.id", ondelete="CASCADE"))
    market_id = db.Column(db.Integer,db.ForeignKey("markets.id", ondelete="CASCADE"))
    yes_shares = db.Column(db.Integer)
    no_shares = db.Column(db.Integer)

    #relationships
    user = db.relationship("User", back_populates="positions")
    market = db.relationship("Market", back_populates="positions", lazy=False)

    def some_dict(self):
        return {
            'id' : self.id,
            'user_id' : self.user_id,
            # 'user' : self.user.some_dict(),
            'market_id' : self.market_id,
            # 'market' : self.market.some_dict(),
            'yes_shares' : self.yes_shares,
            'no_shares' : self.no_shares
        }

    def to_dict(self):
        return {
            'id' : self.id,
            'user_id' : self.user_id,
            'user' : self.user.some_dict(),
            'market_id' : self.market_id,
            'market' : self.market.some_dict(),
            'yes_shares' : self.yes_shares,
            'no_shares' : self.no_shares
        }
