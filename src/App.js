import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './containers/Home/Home'
import NewPage from './containers/NewPage/NewPage'
import Products from './containers/Products/Products'
import Orders from './containers/Orders/Orders'
import Category from './containers/Category/Category'
import Signup from './containers/Signup/Signup'
import Signin from './containers/Signin/Signin'
import PrivateRoute from './components/hoc/PrivateRoute'
import { useSelector, useDispatch } from 'react-redux'
import { isUserLoggedIn } from './store/actions/authActions'
import { getInitialData } from './store/actions/initialDataActions'


function App() {

  //if user decides to reload the app after signing in, you lose your redux auth state. 
  //below will update redux state after reload of entire page if a token has been set
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserLoggedIn())
    }
    if (auth.authenticated) {
      dispatch(getInitialData())
    }
  }, [auth.authenticated])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/newpage" component={NewPage} />
          <PrivateRoute path="/products" component={Products} />
          <PrivateRoute path="/orders" component={Orders} />
          <PrivateRoute path="/category" component={Category} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/" component={() => <h1>Page Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
