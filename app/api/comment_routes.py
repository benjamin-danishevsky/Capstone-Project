from flask import Blueprint, Flask, jsonify, session, request
from app.models import db, User, Tweet, Comment
from flask_login import login_required, current_user
from datetime import datetime
from app.forms import NewCommentForm

comment_routes = Blueprint('comments', __name__)

#Get all Comments
@comment_routes.route('/')
def get_all_comments():
    comments = Comment.query.all()
    return {
        "comments": [comment.to_dict() for comment in comments]
    }

#Get comments belonging to singl tweet. ID in route is tweet_id
@comment_routes.route('/<int:id>/tweet-comments')
def get_tweet_comments(id):
    tweet = Tweet.query.get(id)
    comments = tweet.comments
    return {
        "comments": [comment.to_dict() for comment in comments]
    }

@comment_routes.route('/new-comment', methods=['POST'])
def new_tweet_comment():
    form = NewCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        comment = Comment(
            comment = data['comment'],
            user_id = data['user_id'],
            tweet_id = data['tweet_id']
        )

        db.session.add(comment)
        db.session.commit()
        return {
            'comment': comment.to_dict()
        }

    return form.errors
