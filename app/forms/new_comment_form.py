from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length
from wtforms import StringField, IntegerField, DateTimeField

class NewCommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    
