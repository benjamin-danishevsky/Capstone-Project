const GET_ALL_TWEETS = 'tweets/GET_ALL_TWEETS';


const getAllTweets = tweets => ({
    type: GET_ALL_TWEETS,
    tweets
})


export const getAllTweetsThunk = () => async (dispatch) => {
    const res = await fetch("/api/tweets/", {
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(res.ok){
        const tweets = await res.json()
        dispatch(getAllTweets(tweets))
    }
}


const tweetsReducer = (state = {}, action) => {
    let newState;
    switch(action.type){
        case GET_ALL_TWEETS:
            newState = {...state}
            action.tweets.tweets.forEach((tweet) => {
                newState[tweet.id] = tweet
            })
            return newState;
        default:
            return state
    }
}


export default tweetsReducer
