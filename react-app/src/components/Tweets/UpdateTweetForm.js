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
    const [errors, setErrors] = useState([]);
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
        }
        dispatch(tweetActions.updateTweetThunk(tweetID, newTweet));
        setHasUsed(false)
        hideForm()
    }

    return (
        <form onSubmit={handleSubmit} className="update-tweet-form">
            <ul className="create-comment-errors-list">
                {errors && hasUsed && errors.map((error) => (
                    <li className='error'key={error} style={{color: 'red'}}>{error}</li>
                ))}
            </ul>
            <h4 className='comment-h4'>Update your Chirp</h4>
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

                <div className='update-tweet-btn-div'>
                    <button className='update-tweet-button' typ='submit'>Submit</button>
                    <button className='update-tweet-button' onClick={() =>  hideForm()}>Cancel</button>
                </div>
            </div>
        </form>
    )
}


export default UpdateTweetForm
