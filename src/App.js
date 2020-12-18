import React, {useEffect} from 'react'
import './App.css'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './containers/Home/Home'
import Signup from './containers/Signup/Signup'
import Signin from './containers/Signin/Signin'
import PrivateRoute from './components/hoc/PrivateRoute'
import { useSelector, useDispatch } from 'react-redux'
import { isUserLoggedIn } from './store/actions/authActions'

function App() {
  
  //if user decides to reload the app after signing in, you lose your redux auth state. 
  //below will update redux state after reload of entire page if a token has been set
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserLoggedIn())
    }
  }, [])
  
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" exact component={Home}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signin" component={Signin}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
