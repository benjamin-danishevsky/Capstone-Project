import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as commentActions from "../../store/comments";
import * as userActions from '../../store/users'

import UpdateCommentForm from './UpdateCommentForm'
import '../Tweets/Tweets.css'

const SingleComment = ({comment, idx, owner}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);

    const users = useSelector(state => state.users)
    const comments = useSelector((state) => state.comments);
    const [showEditForm, setShowEditForm] = useState(false);

    return (

        <div>
            <div className="comment-text">
                <p className="comment-p-tag">@{owner}</p>
                <p className="comment-p-tag">{comment.comment}</p>
            </div>

            <button
                className='comment-button'
                onClick={() => setShowEditForm(true)}
            >Edit</button>
            {showEditForm &&
                <div>
                    <UpdateCommentForm comment={comment} hideForm={() => setShowEditForm(false)}/>
                </div>
            }
            <button
                className='comment-button'
                onClick={() => dispatch(commentActions.deleteCommentThunk(comment.id))}
            >Delete</button>
        </div>
    )
}

export default SingleComment
