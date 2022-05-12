import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as tweetActions from '../../store/tweets'

const Tweets = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tweetActions.getAllTweetsThunk())
    }, [dispatch])

    const sessionUser = useSelector(state => state.session.user)
    const tweets = useSelector(state => state.tweets)
    const tweetsData = Object.values(tweets)
    

    return (
        <>
            <div>
                <h1>All Chirps</h1>
                {tweetsData.map((tweet, idx) => (
                    <>
                        <div key={idx}>
                            <ul>
                                <li>{tweet.text}</li>
                            </ul>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default Tweets
