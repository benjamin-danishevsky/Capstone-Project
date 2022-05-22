import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as commentActions from '../../store/comments'

const CommentForm = ({tweetID}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);
    const id = sessionUser.id

    const [text, setText] = useState('');
    const [errors, setErrors] = useState([])
    const [hasUsed, setHasUsed] = useState(false);

    useEffect(() => {
        const validateErrors = [];

        if(typeof(text) !== 'string') validateErrors.push("Unsupported data type entered. You'll have to try harder than that.")
        if(!text) validateErrors.push("Your comment cannot be empty :(");
        if(text.length > 255) validateErrors.push(`Sorry, your comment cannot exceed 255 characters. Your comment is currently ${text.length} characters long.`)
        setErrors(validateErrors)

    }, [text])

    const handleSubmit = async e => {
        e.preventDefault();
        setHasUsed(true)
        if(errors.length > 0) return

        const newComment = {
            comment: text,
            user_id: id,
            tweet_id: tweetID
        }
        dispatch(commentActions.newCommentThunk(newComment))
        setHasUsed(false)
        setText('')
    }

    return (
        <form onSubmit={handleSubmit} className='new-comment-form'>
            <ul className="create-comment-errors-list">
                {errors && hasUsed && errors.map((error) => (
                    <p className='error'key={error} style={{color: 'red'}}>{error}</p>
                ))}
            </ul>
            <h4 className='comment-h4'>Leave a comment</h4>
            <div className = "input-and-button-container">
                <div>
                    <textarea
                        className='comment-input'
                        type='input'
                        placeholder="Leave a comment..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>
                <div className='new-comment-btn-div'>
                    <button className='submit-button' typ='submit'>Submit</button>
                </div>
            </div>

        </form>
    )
}


export default CommentForm
