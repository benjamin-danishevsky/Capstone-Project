const GET_TWEET_COMMENTS = "comments/GET_TWEET_COMMENTS";
const NEW_COMMENT = "comments/NEW_COMMENT";
const UPDATE_COMMENT = "commments/UPDATE_COMMENT";

const getTweetComments = (comments) => ({
    type: GET_TWEET_COMMENTS,
    comments,
});

const newComment = comment => ({
    type: NEW_COMMENT,
    comment,
})

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})

export const getTweetCommentsThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${id}/tweet-comments`);
    if (res.ok) {
        const tweetComments = await res.json();
        return dispatch(getTweetComments(tweetComments));
    }
};

export const newCommentThunk = (payload) => async (dispatch) => {
    const res = await fetch(`/api/comments/new-comment`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    if (res.ok){
        const createdComment = await res.json();
        return dispatch(newComment(createdComment))
    }
}

export const updateCommentThunk = (id, payload) => async (dispatch) => {
    const res = await fetch(`/api/comments/${id}/edit`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    
    if(res.ok){
        const edited = await res.json();
        return dispatch(updateComment(edited))
    }
}

const commentsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_TWEET_COMMENTS:
            newState = { ...state };
            action.comments.comments.forEach((comment) => {
                newState[comment.id] = comment;
            });
            return newState;
        case NEW_COMMENT:
            newState = {...state}
            newState[action.comment.comment.id] = action.comment.comment
            return newState;
        case UPDATE_COMMENT:
            newState = { ...state }
            newState[action.comment.id] = action.comment
            return newState
        default:
            return state;
    }
};

export default commentsReducer;
