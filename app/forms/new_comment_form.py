from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length
from wtforms import StringField, IntegerField

class NewCommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    tweet_id = IntegerField('tweet_id', validators=[DataRequired()])
