
let myState = {
    users:[]
}

const userReducer = (state=myState,action) => {
      switch(action.type) {
          
        case 'GET_USERS': {
            return {
                ...state,
                users:action.payload
            }
        }
        case 'REMOVE_USER': {
            return {
                users:state.users.filter(user => user._id !== action.payload)
            }
        }
         
        default :
           return state
      }
}

export default userReducer