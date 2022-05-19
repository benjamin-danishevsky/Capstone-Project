import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as tweetActions from '../../store/tweets'

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
        <div className = "new-tweet-form">
            <form onSubmit={handleSubmit}>
                <ul className="create-tweet-errors-list">
                    {errors && hasUsed && errors.map((error) => (
                        <li className='error'key={error} style={{color: 'red'}}>{error}</li>
                    ))}
                </ul>
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
