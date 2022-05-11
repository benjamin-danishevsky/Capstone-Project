from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length
from wtforms import StringField, IntegerField, DateTimeField



class NewTweetForm(FlaskForm):
    text = StringField('text', validators=[DataRequired()])
    image_url = StringField('image_url')
    created_at = DateTimeField('created_at')
    updated_at = DateTimeField("updated_at")
    user_id = IntegerField('user_id', validators=[DataRequired()])
