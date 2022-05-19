import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as tweetActions from '../../store/tweets'
import * as userActions from '../../store/users'

import UpdateTweetForm from '../Tweets/UpdateTweetForm'
import Comments from '../Comments/index'

const SingleTweet = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const {id} = useParams();
    const tweet = useSelector(state => state.tweets)
    const tweetData = Object.values(tweet)
    console.log(tweetData)
    const tweetOwnerID = tweetData[0]?.user_id;

    const user = useSelector(state => state.users)

    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        dispatch(tweetActions.getOneTweetThunk(id))
    }, [dispatch])

    useEffect(() => {
        dispatch(userActions.getUserThunk(tweetData[0]?.user_id))
    }, [dispatch, tweet])

    let content = null
    //console.log(id)
    if (showEditForm) {
        content = (
            <>
                <UpdateTweetForm tweet={tweetData} tweetID={id} hideForm={() => setShowEditForm(false)} />
            </>
        )
    }

    return (
        <>
            <h3>Single Tweet</h3>
            <ul>
                <li>Posted By: @{user[tweetOwnerID]?.username}</li>
                <li>{tweetData[0]?.text}</li>
                <li>Posted: {tweetData[0]?.created_at}</li>
            </ul>
            <button
                onClick={() => setShowEditForm(true)}
            >
                Edit</button>

            {showEditForm && content}
            <button
                onClick={() => {
                    dispatch(tweetActions.deleteTweetThunk(tweetData[0]?.id))
                    history.push('/construction')
                }}
            >Delete</button>

            <Comments tweet={tweetData} tweetID={id} hideForm={() => setShowEditForm(false)}/>
        </>
    )
}


export default SingleTweet
