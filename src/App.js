import React, {useEffect, createContext, useReducer, useContext} from 'react';
import Navbar from './compoment/NavBar';
import "./scss/App.css";
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import Home from './compoment/view/Home';
import Login from './compoment/view/Login';
import Profile from './compoment/view/Profile';
import Register from './compoment/view/Register';
import CreatePost from './compoment/view/CreatePost';
import UserProfile from './compoment/view/UserProfile';
import SubUserPost from './compoment/view/SubUserPost';
import {reducer, initialState} from './reducer/userReducer';

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload:user})
      history.push('/')
    }else{
      // history.push('/SubUserPost')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/home">
        <Login/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/register">
        <Register/>
      </Route>
      <Route exact path="/profile">
        <Profile/>
      </Route>
      <Route path="/create">
        <CreatePost mode="create" />
      </Route>
      <Route path="/edit-post">
        <CreatePost mode="edit"/>
      </Route>
      <Route path="/profile/:userid">
        <UserProfile/>
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
      <Navbar/>
      <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App;
