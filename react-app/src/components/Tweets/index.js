import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import * as tweetActions from '../../store/tweets'
import * as userActions from '../../store/users'
// use moment js for time posted. moment.js.
import './Tweets.css'
import NewTweetForm from './NewTweetForm'

const Tweets = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tweetActions.getAllTweetsThunk())
        dispatch(userActions.getAllUsersThunk())
    }, [dispatch])

    const sessionUser = useSelector(state => state.session.user)
    const tweets = useSelector(state => state.tweets)
    const tweetsData = Object.values(tweets).reverse()
    const users = useSelector(state => state.users)


    return (
        <div className="all-tweets-container">
            <div className='new-tweet-form-container'>
                <NewTweetForm />
            </div>
            <div className='tweets-container'>
                {tweetsData.map((tweet, idx) => (
                    <div className='individual-tweet' key={idx}>
                        <Link to={`/tweets/${tweet.id}`} style={{ textDecoration: 'none' }}>
                            <div className='individual-tweet-text'>
                                <p className='tweet-p-tag'>@{users[tweet.user_id]?.username}</p>
                                <p className='tweet-p-tag'>{tweet.text}</p>
                                <p className='tweet-p-tag'>Posted: {tweet.created_at}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tweets
