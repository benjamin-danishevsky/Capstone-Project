import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as tweetActions from '../../store/tweets'
import * as userActions from '../../store/users'

import Tweets from '../Tweets/index'
import './HomePage.css'

const HomePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const tweetsObj = useSelector(state => state.tweets)
    const userObj = useSelector(state => state.user)

    return (
        <div className="homepage-page-container">
            
            <div className="homepage-navbar-container"></div>
            <div className="homepage-tweets-container"></div>
            <div className="homepage-users-links-container"></div>
        </div>
    )
}

export default HomePage
