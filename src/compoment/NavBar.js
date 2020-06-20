import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'


const Navbar = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = () => {
      if(state){
        return[
          <li style={{fontWeight:"bold"}}><Link to="/profile">Your List Review</Link></li>,
          <li style={{fontWeight:"bold"}}><Link to="/create">Upload Review</Link></li>,
          <li>
            <button className="btn waves-effect waves-light black"
                    onClick={() => {
                      localStorage.clear()
                      dispatch({type:"CLEAR"})
                      history.push('/login')
                      }}
                      >
                Logout
            </button>
          </li>
        ]
      }else{
        return [
          <li style={{fontWeight:"bold"}}><Link to="/login">Login|</Link></li>,
          <li style={{fontWeight:"bold"}}><Link to="/register">Register|</Link></li>
          
        ]
      }
    }
    return(
        <nav>
        <div className="nav-wrapper orange" style= {{classes: "blue"}}>
          <Link to="/" className="brand-logo left bold" style={{marginLeft:"8%", fontWeight:"bold"}}>Switzerland's Review</Link>
          <ul id="nav-mobile" className="right" style={{marginRight:"8%"}}>
            {renderList()}
          </ul>
        </div>
        </nav>
    )
}

export default Navbar

{/* <Link to={state?"/":"/SubUserPost"} className="brand-logo left bold" style={{marginLeft:"15%"}}>Switzerland's Review</Link> */}