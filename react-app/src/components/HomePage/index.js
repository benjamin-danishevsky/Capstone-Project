import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import * as tweetActions from '../../store/tweets'
import * as userActions from '../../store/users'

import Tweets from '../Tweets/index'
import './HomePage.css'
import NavBar from '../NavBar'

const HomePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const tweetsObj = useSelector(state => state.tweets)
    const userObj = useSelector(state => state.user)

    if(!sessionUser) history.push('/')
    return (
        <div className="homepage-page-container">

            <div className="homepage-navbar-container">
                <h3>NavBar</h3>
                <div className='homepage-navbar'>
                    <NavBar />
                </div>
            </div>
            <div className="homepage-tweets-container">
                <h3>HOME</h3>
                <div className="homepage-all-tweets">
                    <Tweets />
                </div>
            </div>
            <div className="homepage-users-links-container">
                {/* <p>Users</p> */}
            </div>
        </div>
    )
}

export default HomePage
