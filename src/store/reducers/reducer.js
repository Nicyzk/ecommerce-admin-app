import { combineReducers } from 'redux'
import authReducer from './reducers/auth'
import signupReducer from './reducers/signup'

const rootReducer = combineReducers({
    auth: authReducer,
    signup: signupReducer
})
export default rootReducer