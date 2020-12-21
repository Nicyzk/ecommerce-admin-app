import { combineReducers } from 'redux'
import authReducer from './reducers/auth'
import signupReducer from './reducers/signup'
import productsReducer from './reducers/products'
import ordersReducer from './reducers/orders'
import categoryReducer from './reducers/category'

const rootReducer = combineReducers({
    auth: authReducer,
    signup: signupReducer,
    products: productsReducer,
    orders: ordersReducer,
    category: categoryReducer
})
export default rootReducer