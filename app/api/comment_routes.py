from flask import Blueprint, Flask, jsonify, session, request
from app.models import db, User, Tweet, Comment
from flask_login import login_required, current_user
from datetime import datetime

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
