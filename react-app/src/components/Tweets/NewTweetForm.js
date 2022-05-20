import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as tweetActions from '../../store/tweets'
import './Tweets.css'

const TweetForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);
    let id = null
    if(!sessionUser) history.push('/')
    if(sessionUser) id = sessionUser.id
    const tweets = useSelector(state => state.tweets)


    const [text, setText] = useState('');
    const [errors, setErrors] = useState([])
    const [hasUsed, setHasUsed] = useState(false);

    useEffect(() => {
        const validateErrors = [];

        if(typeof(text) !== 'string') validateErrors.push("Unsupported data type entered. You'll have to try harder than that.")
        if(!text) validateErrors.push("Your Chirp cannot be empty :(");
        if(text.length > 200) validateErrors.push(`Sorry, your Chirp cannot exceed 200 characters. Your Chirp is currently ${text.length} characters long.`)
        setErrors(validateErrors)

    }, [text])

    const handleSubmit = async e => {
        e.preventDefault();
        setHasUsed(true)
        if(errors.length > 0) return

        const newTweet = {
            text,
            user_id: id
        }
        dispatch(tweetActions.newTweetThunk(newTweet));
        setHasUsed(false)
        setText('')
    }

    return (

        <form onSubmit={handleSubmit} className="new-tweet-form">
            <ul className="create-tweet-errors-list">
                {errors && hasUsed && errors.map((error) => (
                    <li className='error'key={error} style={{color: 'red'}}>{error}</li>
                ))}
            </ul>
            <div className = "input-and-button-container">
                <div>
                    <textarea
                        className='tweet-input'
                        type='input'
                        placeholder="What's your chirp?"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>
                
                <div className='new-tweet-btn-div'>
                    <button className='submit-button'typ='submit'>Chirp</button>
                </div>

            </div>

        </form>

    )
}


export default TweetForm
