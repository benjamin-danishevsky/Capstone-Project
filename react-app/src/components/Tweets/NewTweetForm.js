import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as tweetActions from '../../store/tweets'

const TweetForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);
    const id = sessionUser.id
    const tweets = useSelector(state => state.tweets)


    const [text, setText] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        const newTweet = {
            text,
            user_id: id
        }
        dispatch(tweetActions.newTweetThunk(newTweet));
        setText('')
    }

    return (
        <div className = "new-tweet-form">
            <form onSubmit={handleSubmit}>
                {/* <ul className="create-tweet-errors-list">
                    {errors && errors.map((error) => (
                        <li className='error'key={error} style={{color: 'red'}}>{error}</li>
                    ))}
                </ul> */}
                <h1>Create a new Chirp</h1>
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


export default TweetForm
