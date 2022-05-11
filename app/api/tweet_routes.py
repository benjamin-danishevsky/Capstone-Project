from flask import Blueprint, Flask, jsonify, session, request
from app.models import db, User, Tweet
from flask_login import login_required, current_user
from datetime import datetime
from app.forms import NewTweetForm
from app.forms import EditTweetForm

tweet_routes = Blueprint('tweets', __name__)

#Get all tweets
@tweet_routes.route('/')
def get_all_tweets():
    tweets = Tweet.query.all()
    return {
        "tweets": [tweet.to_dict() for tweet in tweets]
    }

#Get single tweet by id
@tweet_routes.route('/<int:id>')
def get_tweet(id):
    tweet = Tweet.query.get(id)
    return {
        "tweet": tweet.to_dict()
    }

#Create new tweet
@tweet_routes.route('/new-tweet', methods=['POST'])
def newTweet():
    form = NewTweetForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        tweet = Tweet(
            text=data['text'],
            #image_url=data['image_url'], #for future when AWS is integrated
            created_at=datetime.now(),
            updated_at=datetime.now(),
            user_id=data['user_id']
        )

        db.session.add(tweet)
        db.session.commit()
        return {
            "tweet": tweet.to_dict()
        }

    return form.errors

#Edit existing tweet
@tweet_routes.route('/<int:id>/edit', methods=['POST'])
#@login_required #for when adding autherization
def edit_tweet(id):
    form = EditTweetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    tweet = Tweet.query.get(id)

    if form.validate_on_submit():
        tweet.text = data['text']
        tweet.updated_at = datetime.now()

        db.session.commit()
        return tweet.to_dict()

    return form.errors
