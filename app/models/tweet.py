from .db import db

class Tweet(db.Model):
    __tablename__ = 'tweets'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    text = db.Column(db.String(200), nullable=False)
    image_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    owner = db.relationship(
        "User",
        back_populates='tweet'
    )

    comments = db.relationship(
        "Comment",
        back_populates='tweet',
        cascade='all, delete-orphan'
    )


    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_id': self.user_id
        }
