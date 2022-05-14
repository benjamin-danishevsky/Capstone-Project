const GET_USER = '/users/GET_USER'
const GET_ALL_USERS = '/usrs/GET_ALL_USERS'

const getUser = user => ({
    type: GET_USER,
    user
})

const getAllUsers = users => ({
    type: GET_ALL_USERS,
    users
})

export const getUserThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`)

    if(res.ok){
        const user = await res.json();
        dispatch(getUser(user))
    }
}

export const getAllUsersThunk = () => async (dispatch) => {
    const res = await fetch('/api/users/')
    if(res.ok){
        const users = await res.json();
        dispatch(getAllUsers(users))
    }
}

const usersReducer = (state = {}, action) => {
    let newState
    switch (action.type){
        case GET_ALL_USERS:
            newState = {...state}
            action.users.users.forEach(user => {
                newState[user.id] = user
            })
            return newState;
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
