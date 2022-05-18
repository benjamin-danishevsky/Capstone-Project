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

    const handleSubmit = async e => {
        e.preventDefault();

        const newComment = {
            comment: text,
            user_id: id,
            tweet_id: tweetID
        }
        dispatch(commentActions.newCommentThunk(newComment))
        setText('')
    }

    return (
        <div className = "new-comment-form">
            <form onSubmit={handleSubmit}>
                {/* <ul className="create-tweet-errors-list">
                    {errors && errors.map((error) => (
                        <li className='error'key={error} style={{color: 'red'}}>{error}</li>
                    ))}
                </ul> */}
                <h4>Leave a comment</h4>
                <div>
                    <input
                        type='input'
                        placeholder="Leave a comment..."
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


export default CommentForm
