from flask import Blueprint, Flask, jsonify, session, request
from app.models import db, User, Tweet, Comment
from flask_login import login_required, current_user
from datetime import datetime
from app.forms import NewCommentForm
from app.forms import EditCommentForm

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

#Create new comment for tweet
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

#Edit comment. <int:id> is comment ID
@comment_routes.route('/<int:id>/edit', methods=['POST'])
def edit_tweet_comment(id):
    form = EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(id)

    if form.validate_on_submit():
        data = form.data
        comment.comment = data['comment']

        db.session.commit()
        return comment.to_dict()

    return form.errors

#Delete comment. <int:id> is comment ID
@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()
