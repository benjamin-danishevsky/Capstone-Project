from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length
from wtforms import StringField, IntegerField, DateTimeField



class EditTweetForm(FlaskForm):
    text = StringField('text', validators=[DataRequired()])
    image_url = StringField('image_url')
    updated_at = DateTimeField("updated_at")
