from app.models import db, Comment
import datetime

def seed_comments():
    comment1 = Comment(
        comment= 'This is comment number 1',
        user_id=1,
        tweet_id=1,
    )

    comment2 = Comment(
        comment= 'This is comment number 2',
        user_id=1,
        tweet_id=2,
    )

    comment3 = Comment(
        comment= 'This is comment number 3',
        user_id=1,
        tweet_id=3,
    )

    comment4 = Comment(
        comment= 'This is comment number 4',
        user_id=1,
        tweet_id=4,
    )

    comment5 = Comment(
        comment= 'This is comment number 5',
        user_id=1,
        tweet_id=5,
    )

    comment6 = Comment(
        comment= 'This is comment number 6',
        user_id=1,
        tweet_id=6,
    )

    comment7 = Comment(
        comment= 'This is comment number 7',
        user_id=2,
        tweet_id=1,
    )

    comment8 = Comment(
        comment= 'This is comment number 8',
        user_id=2,
        tweet_id=2,
    )

    comment9 = Comment(
        comment= 'This is comment number 9',
        user_id=2,
        tweet_id=3,
    )

    comment10 = Comment(
        comment= 'This is comment number 10',
        user_id=2,
        tweet_id=4,
    )

    comment11 = Comment(
        comment= 'This is comment number 11',
        user_id=2,
        tweet_id=5,
    )

    comment12 = Comment(
        comment= 'This is comment number 12',
        user_id=2,
        tweet_id=6,
    )

    comment13 = Comment(
        comment= 'This is comment number 13',
        user_id=3,
        tweet_id=1,
    )

    comment14 = Comment(
        comment= 'This is comment number 14',
        user_id=3,
        tweet_id=2,
    )

    comment15 = Comment(
        comment= 'This is comment number 15',
        user_id=3,
        tweet_id=3,
    )

    comment16 = Comment(
        comment= 'This is comment number 16',
        user_id=3,
        tweet_id=4,
    )

    comment17 = Comment(
        comment= 'This is comment number 17',
        user_id=3,
        tweet_id=5,
    )

    comment18 = Comment(
        comment= 'This is comment number 18',
        user_id=3,
        tweet_id=6,
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.add(comment16)
    db.session.add(comment17)
    db.session.add(comment18)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
