const GET_ALL_TWEETS = 'tweets/GET_ALL_TWEETS';
const NEW_TWEET = 'tweets/NEW_TWEET';

const getAllTweets = tweets => ({
    type: GET_ALL_TWEETS,
    tweets
})

const newTweet = tweet => ({
    type: NEW_TWEET,
    tweet
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

export const newTweetThunk = (payload) => async (dispatch) => {
    const res = await fetch("/api/tweets/new-tweet", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    if(res.ok){
        const tweet = await res.json()
        return dispatch(newTweet(tweet))
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
        case NEW_TWEET:
            newState = {...state}
            newState[action.tweet.tweet.id] = action.tweet.tweet
            return newState;
        default:
            return state
    }
}


export default tweetsReducer
