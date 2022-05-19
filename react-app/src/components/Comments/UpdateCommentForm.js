import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as commentActions from '../../store/comments'



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
        <div className = "update-comment-form">
            <form onSubmit={handleSubmit}>
                <ul className="create-tweet-errors-list">
                    {errors && hasUsed && errors.map((error) => (
                        <li className='error'key={error} style={{color: 'red'}}>{error}</li>
                    ))}
                </ul>
                <h4>Update your Comment</h4>
                <div>
                    <input
                        type='input'
                        placeholder="Update your Comment..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>

                <div>
                    <button typ='submit'>Submit</button>
                    <button onClick={() =>  hideForm()}>Cancel</button>
                </div>
            </form>
        </div>
    )
}


export default UpdateCommentForm
