import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as tweetActions from '../../store/tweets'
import * as userActions from '../../store/users'

import UpdateTweetForm from '../Tweets/UpdateTweetForm'
import Comments from '../Comments/index'
import NavBar from '../NavBar'
import '../Tweets/Tweets.css'
import '../HomePage/HomePage.css'

const SingleTweet = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const {id} = useParams();
    const tweet = useSelector(state => state.tweets)
    const tweetData = Object.values(tweet)
    const tweetOwnerID = tweetData[0]?.user_id;

    const user = useSelector(state => state.users)

    const [showEditForm, setShowEditForm] = useState(false);

    const [canEdit, setCanEdit] = useState(false)
    let visibility = false

    useEffect(() => {
        dispatch(tweetActions.getOneTweetThunk(id))
    }, [dispatch])

    useEffect(() => {
        dispatch(userActions.getUserThunk(tweetData[0]?.user_id))
        //checks if logged in user is owner of tweet
        if (sessionUser){
            if (sessionUser.id === tweetData[0]?.user_id){
                setCanEdit(true)
            }
        }
    }, [dispatch, tweet, canEdit]);

    let content = null
    //console.log(id)
    if (showEditForm) {
        content = (
            <div>
                <UpdateTweetForm tweet={tweetData} tweetID={id} hideForm={() => setShowEditForm(false)} />
            </div>
        )
    }
    return (
        <div className="homepage-page-container">
            <div className="homepage-navbar-container">
                <h3>NavBar</h3>
                <div className='homepage-navbar'>
                    <NavBar />
                </div>
            </div>

            <div className='homepage-tweets-container'>

                <div className='individual-tweet'>
                    <div className="individual-tweet-text">
                        <p>Posted By: @{user[tweetOwnerID]?.username}</p>
                        <p>{tweetData[0]?.text}</p>
                        <p>Posted: {tweetData[0]?.created_at}</p>
                    </div>
                    <button
                        className='update-tweet-button'
                        onClick={() => setShowEditForm(true)}
                        style={{ visibility: canEdit ? 'visible' : 'hidden' }}
                    >
                        Edit</button>

                    <button
                        className='update-tweet-button'
                        onClick={() => {
                            dispatch(tweetActions.deleteTweetThunk(tweetData[0]?.id))
                            history.push('/home')
                        }}
                        style={{ visibility: canEdit ? 'visible' : 'hidden' }}
                        >Delete</button>
                    {showEditForm && content}
                </div>

                <Comments tweet={tweetData} tweetID={id} hideForm={() => setShowEditForm(false)}/>
            </div>

            <div className="homepage-users-links-container">
                {/* <p>Users</p> */}
            </div>
        </div>
    )
}


export default SingleTweet
