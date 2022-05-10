from app.models import db, Tweet
import datetime

def seed_tweets():
    tweet1 = Tweet(
        text='This is tweet number 1',
        created_at= datetime.datetime.today(),
        updated_at= datetime.datetime.today(),
        user_id=1
    )

    tweet2 = Tweet(
        text='This is tweet number 2',
        created_at= datetime.datetime.today(),
        updated_at= datetime.datetime.today(),
        user_id=2
    )

    tweet3 = Tweet(
        text='This is tweet number 2',
        created_at= datetime.datetime.today(),
        updated_at= datetime.datetime.today(),
        user_id=3
    )

    tweet4 = Tweet(
        text='This is tweet number 4',
        created_at= datetime.datetime.today(),
        updated_at= datetime.datetime.today(),
        user_id=1
    )

    tweet5 = Tweet(
        text='This is tweet number 4',
        created_at= datetime.datetime.today(),
        updated_at= datetime.datetime.today(),
        user_id=2
    )

    tweet6 = Tweet(
        text='This is tweet number 4',
        created_at= datetime.datetime.today(),
        updated_at= datetime.datetime.today(),
        user_id=3
    )

    db.session.add(tweet1)
    db.session.add(tweet2)
    db.session.add(tweet3)
    db.session.add(tweet4)
    db.session.add(tweet5)
    db.session.add(tweet6)

    db.session.commit()

def undo_tweets():
    db.session.execute('TRUNCATE tweets RESTART IDENTITY CASCADE;')
    db.session.commit()
