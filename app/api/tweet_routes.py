from flask import Blueprint, Flask, jsonify, session, request
from app.models import db, User, Tweet
from flask_login import login_required, current_user
from datetime import datetime

tweet_routes = Blueprint('tweets', __name__)


@tweet_routes.route('/')
def get_all_tweets():
    tweets = Tweet.query.all()
    return {
        "tweets": [tweet.to_dict() for tweet in tweets]
    }

@tweet_routes.route('/<int:id>')
def get_tweet(id):
    tweet = Tweet.query.get(id)
    return {
        "tweet": tweet.to_dict()
    }
