import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as tweetActions from '../../store/tweets'
import * as userActions from '../../store/users'

import UpdateTweetForm from '../Tweets/UpdateTweetForm'

const SingleTweet = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const {id} = useParams();
    const tweet = useSelector(state => state.tweets)
    const tweetData = Object.values(tweet)
    const tweetOwnerID = tweetData[0]?.id;

    const user = useSelector(state => state.users)
    const userData = Object.values(user)[0]

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
                <li>Posted By: {userData?.username}</li>
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
                    history.push('/tweets')
                }}
            >Delete</button>
        </>
    )
}


export default SingleTweet
