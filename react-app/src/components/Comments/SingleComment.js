import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as commentActions from "../../store/comments";
import * as userActions from '../../store/users'

import UpdateCommentForm from './UpdateCommentForm'

const SingleComment = ({comment, idx, owner}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);

    const users = useSelector(state => state.users)
    const comments = useSelector((state) => state.comments);
    const [showEditForm, setShowEditForm] = useState(false);

    return (

        <div>
            <ul>
                <li>@{owner}</li>
                <li>{comment.comment}</li>
                <li>Index: {idx}</li>
            </ul>

            <button
                onClick={() => setShowEditForm(true)}
            >Edit</button>
            {showEditForm &&
                <div>
                    <UpdateCommentForm comment={comment} hideForm={() => setShowEditForm(false)}/>
                </div>
            }
            <button
                onClick={() => dispatch(commentActions.deleteCommentThunk(comment.id))}
            >Delete</button>
        </div>
    )
}

export default SingleComment
