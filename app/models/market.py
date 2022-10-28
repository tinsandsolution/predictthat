from .db import db

class Market(db.Model):
    __tablename__ = 'markets'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    manager_id = db.Column(db.Integer,db.ForeignKey("users.id", ondelete="CASCADE"))
    image_url = db.Column(db.String(255), nullable=False)
    short_title = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    expected_resolution_time = db.Column(db.DateTime)
    is_open = db.Column(db.Boolean, server_default="true", nullable=False)
    is_in_play = db.Column(db.Boolean, server_default="false", nullable=False)
    yes_value = db.Column(db.Float, nullable=False, server_default="0")
    no_value = db.Column(db.Float, nullable=False, server_default="0")

    #relationships
    manager = db.relationship("User", back_populates="markets", lazy=False)
    positions = db.relationship("Position", back_populates="market", lazy=False)
    sellOrders = db.relationship("SellOrder", back_populates="market")
    # buyOrders = db.relationship("BuyOrder", back_populates="market")



    def to_dict(self):
        return {
            'id': self.id,
            'manager_id' : self.manager_id,
            'manager' : self.manager.some_dict(),
            'image_url' : self.image_url,
            'short_title' : self.short_title,
            'title' : self.title,
            'description' : self.description,
            'is_in_play' : self.is_in_play,
            'expected_resolution_time' : self.expected_resolution_time,
            'is_open' : self.is_open,
            "positions" : [i.to_dict() for i in self.positions],
            "sellOrders" : [i.to_dict() for i in self.sellOrders],
            # "buyOrders" : [i.to_dict() for i in self.buyOrders]
        }

    def some_dict(self):
        return {
            'id': self.id,
            'manager_id' : self.manager_id,
            'manager' : self.manager.some_dict(),
            'image_url' : self.image_url,
            'short_title' : self.short_title,
            'title' : self.title,
            'description' : self.description,
            'is_in_play' : self.is_in_play,
            'expected_resolution_time' : self.expected_resolution_time,
            'is_open' : self.is_open,
    }
