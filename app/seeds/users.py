from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password',
        bio='this is a bio for Demo', profile_pic='https://www.clipartmax.com/png/small/100-1005846_waiter-free-icon-avatar-profile-circle-png.png'
    )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password',
        bio='this is a bio for marnie', profile_pic='https://www.clipartmax.com/png/small/100-1005846_waiter-free-icon-avatar-profile-circle-png.png'
    )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password',
        bio='this is a bio for bobbie', profile_pic='https://www.clipartmax.com/png/small/100-1005846_waiter-free-icon-avatar-profile-circle-png.png'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
