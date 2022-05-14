const GET_USER = '/users/GET_USER'


const getUser = user => ({
    type: GET_USER,
    user
})

export const getUserThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`)

    if(res.ok){
        const user = await res.json();
        dispatch(getUser(user))
    }
}

const usersReducer = (state = {}, action) => {
    let newState
    switch (action.type){
        case GET_USER:
            newState = {...state}
            //console.log(action.user)
            newState[action.user.id] = action.user
            return newState
        default:
            return state
    }
}

export default usersReducer
