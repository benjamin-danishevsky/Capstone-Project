import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as commentActions from "../../store/comments";
import * as userActions from '../../store/users'

import CommentForm from './NewCommentForm'
import UpdateCommentForm from './UpdateCommentForm'
import SingleComment from './SingleComment'

const Comments = ({ tweetID }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const users = useSelector(state => state.users)
    const comments = useSelector((state) => state.comments);
    const commentsData = Object.values(comments).reverse()

    const [showEditForm, setShowEditForm] = useState(false);


    useEffect(() => {
        dispatch(commentActions.getTweetCommentsThunk(tweetID));
        dispatch(userActions.getAllUsersThunk())
    }, [dispatch]);


    return (
        <div className="all-comments-container">
                <div className="new-comment-form-container">
                    <CommentForm tweetID={tweetID}/>
                </div>

                <div className="comments-container">
                    {commentsData.map((comment, idx) => (
                        <div className='individual-comment' key={idx}>
                            <SingleComment
                                comment={comment}
                                idx={idx}
                                owner={users[comment.user_id]?.username}
                            />
                        </div>
                    ))}
                </div>

        </div>
    );
};

export default Comments;
