import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as tweetActions from '../../store/tweets'

const UpdateTweetForm = ({tweet, tweetID, hideForm}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);

    //const tweets = useSelector(state => state.tweets)
    const  tweetData = tweet[0]
    //console.log(tweetID)

    const [text, setText] = useState(tweetData.text);

    const handleSubmit = async e => {
        e.preventDefault();

        const newTweet = {
            text,
        }
        dispatch(tweetActions.updateTweetThunk(tweetID, newTweet));
        hideForm()
    }

    return (
        <div className = "update-tweet-form">
            <form onSubmit={handleSubmit}>
                {/* <ul className="create-tweet-errors-list">
                    {errors && errors.map((error) => (
                        <li className='error'key={error} style={{color: 'red'}}>{error}</li>
                    ))}
                </ul> */}
                <h1>Update your Chirp</h1>
                <div>
                    <input
                        type='input'
                        placeholder="What's your chirp?"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>

                <div>
                    <button typ='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}


export default UpdateTweetForm
