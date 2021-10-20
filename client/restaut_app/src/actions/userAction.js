import { isAuthenticated } from "../user/userToken"

const { user, token } = isAuthenticated()
export const getAllUsers = (userId,userToken) => dispatch => {
    fetch(`http://localhost:2000/api/users/all/${userId}`, {
      method: "GET",
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json",
        "Authorization":`Bearer ${userToken}`
      }
    }).then(res => res.json())
      .then(res => {
           let usersFilters = res.users.filter(user => user.role !== 1 )
          dispatch({
              type:'GET_USERS',
              payload:usersFilters
          })
      })
}

export const removeUser = (id) => dispatch => {
    fetch(`http://localhost:2000/api/users/${user._id}`, {
        method: "DELETE",
        headers: {
          "Authorization":`Bearer ${token}`
        }
    }).then(() => {
        dispatch({
            type:'REMOVE_USER',
            payload:id
        })
    })
}