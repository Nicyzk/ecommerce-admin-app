import { combineReducers } from 'redux'
import authReducer from './reducers/auth'
import signupReducer from './reducers/signup'
import productsReducer from './reducers/products'
import ordersReducer from './reducers/orders'
import categoryReducer from './reducers/category'
import pageReducer from './reducers/page'

const rootReducer = combineReducers({
    auth: authReducer,
    signup: signupReducer,
    products: productsReducer,
    orders: ordersReducer,
    category: categoryReducer,
    page: pageReducer
})
export default rootReducer