import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
const Login = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const PostLogin = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Enter correct email", classes:"green"})
            return
        }
        fetch("/login",{
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
        .then( data => {
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes:"red"})
            }
            else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER", payload:data.user})
                M.toast({html: "Login success", classes:"green"})
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
    }
    return(
        //TODO: Step 2 - Fix layout
        <div className="mycard">
          <div className="card auth-card">
            <h4>YOUR ACCOUNT</h4>
            <input type="text" 
                   placeholder="Email" 
                   value={email}
                   onChange={(event) => setEmail(event.target.value)}/>
            <input type="password"
                   placeholder="Password" 
                   value={password}
                   onChange={(event) => setPassword(event.target.value)}/>
            <button className="btn waves-effect waves-light green"
                    onClick={() => PostLogin()}>
                Login
            </button>
            <br/>
            <Link to="/register">
                <p>
                    Create account
                </p>
            </Link>
          </div>
        </div>
        
    )
}

export default Login;