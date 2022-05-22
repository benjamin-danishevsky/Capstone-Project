const GET_ALL_TWEETS = 'tweets/GET_ALL_TWEETS';
const GET_ONE_TWEET = 'tweets/GET_ONE_TWEET'
const NEW_TWEET = 'tweets/NEW_TWEET';
const UPDATE_TWEET = 'tweets/UPDATE_TWEET'
const DELETE_TWEET = 'tweets/DELETE_TWEET'

const getAllTweets = tweets => ({
    type: GET_ALL_TWEETS,
    tweets
})

const getOneTweet = tweet => ({
    type: GET_ONE_TWEET,
    tweet
})

const newTweet = tweet => ({
    type: NEW_TWEET,
    tweet
})

const updateTweet = tweet => ({
    type: UPDATE_TWEET,
    tweet
})

const deleteTweet = id => ({
    type: DELETE_TWEET,
    id
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

export const getOneTweetThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${id}`)
    if(res.ok){
        const tweet = await res.json()
        dispatch(getOneTweet(tweet))
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

export const updateTweetThunk = (id, payload) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${id}/edit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if(res.ok){
        const updatedTweet = await res.json()
        return dispatch(updateTweet(updatedTweet))
    }
}

export const deleteTweetThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/tweets/${id}`, {
        method: 'DELETE'
    })
    if(res.ok){
        dispatch(deleteTweet(id))
    }
}


const tweetsReducer = (state = {}, action) => {
    let newState;
    console.log("REDUCER", action.type)
    switch(action.type){
        case GET_ALL_TWEETS:
            newState = {...state}
            action.tweets.tweets.forEach((tweet) => {
                newState[tweet.id] = tweet
            })
            return newState;
        case GET_ONE_TWEET:
            newState = {}
            console.log("GET ONE TWEET")
            newState[action.tweet.tweet.id] = action.tweet.tweet
            return newState;
        case NEW_TWEET:
            newState = {...state}
            newState[action.tweet.tweet.id] = action.tweet.tweet
            return newState;
        case UPDATE_TWEET:
            newState = {...state}
            newState[action.tweet.id] = action.tweet
            return newState
        case DELETE_TWEET:
            newState = {...state}
            delete newState[action.id];
            return newState;
        default:
            return state
    }
}


export default tweetsReducer
