import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as commentActions from '../../store/comments'
import '../Tweets/Tweets.css'


const UpdateCommentForm = ({comment, tweetID, hideForm}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);

    const [text, setText] = useState(comment.comment);
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

        const updateComment = {
            comment: text,
        }

        dispatch(commentActions.updateCommentThunk(comment.id, updateComment))
        setHasUsed(false)
        hideForm()
    }

    return (
        <form onSubmit={handleSubmit} className='new-comment-form'>
            <ul className="create-comement-errors-list">
                {errors && hasUsed && errors.map((error) => (
                    <p className='error'key={error} style={{color: 'red'}}>{error}</p>
                ))}
            </ul>
            <h4 className='comment-h4'>Update your Comment</h4>

            <div className = "input-and-button-container">

                <div>
                    <textarea
                        className='comment-input'
                        type='input'
                        placeholder="Update your Comment..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>

                <div className='new-comment-btn-div'>
                    <button className='comment-submit-button' typ='submit'>Submit</button>
                    <button className='comment-submit-button' onClick={() =>  hideForm()}>Cancel</button>
                </div>
            </div>
        </form>
    )
}


export default UpdateCommentForm
