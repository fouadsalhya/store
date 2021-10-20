import { combineReducers } from 'redux'
import authReducer from './authReducer'
import cartReducer from './cartReducer'
import userReducer from './userReducer'

const rootReducers = combineReducers({
  auth:authReducer,
  cart:cartReducer,
  users:userReducer
})

export default rootReducers