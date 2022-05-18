import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as commentActions from "../../store/comments";
import * as userActions from '../../store/users'

import CommentForm from './NewCommentForm'

const Comments = ({ tweetID }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const users = useSelector(state => state.users)
    const comments = useSelector((state) => state.comments);
    const commentsData = Object.values(comments)

    const [showEditForm, setShowEditForm] = useState(false);


    useEffect(() => {
        dispatch(commentActions.getTweetCommentsThunk(tweetID));
        dispatch(userActions.getAllUsersThunk())
    }, [dispatch]);

    return (
        <>
            <div>
                <h3>Comments: ...</h3>

                <CommentForm tweetID={tweetID}/>

                {commentsData.map((comment, idx) => (
                    <div key={idx}>
                        <ul>
                            <li>@{users[comment.user_id]?.username}</li>
                            <li>{comment.comment}</li>
                        </ul>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Comments;
