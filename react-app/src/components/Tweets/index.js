import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as tweetActions from '../../store/tweets'
import * as userActions from '../../store/users'

const Tweets = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tweetActions.getAllTweetsThunk())
        dispatch(userActions.getAllUsersThunk())
    }, [dispatch])

    const sessionUser = useSelector(state => state.session.user)
    const tweets = useSelector(state => state.tweets)
    const tweetsData = Object.values(tweets)
    const users = useSelector(state => state.users)


    return (
        <>
            <div>
                {tweetsData.map((tweet, idx) => (
                    <div key={idx}>
                        <div>
                            <ul>
                                <li>@{users[tweet.user_id].username}</li>
                                <li>{tweet.text}</li>
                                <li>Posted: {tweet.created_at}</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Tweets
