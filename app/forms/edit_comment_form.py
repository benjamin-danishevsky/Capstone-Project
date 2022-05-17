from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from wtforms import StringField, IntegerField

class EditCommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired()])
