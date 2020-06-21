import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'

const Profile = () => {
    const [mypic, setMypic] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('https://server-review.herokuapp.com/mynewsfeed', {
            headers:{
                "Authorization": "" + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            setMypic(result.mynewsfeed)
        })
    },[])
    return(
        <div style={{maxWidth:"700px", margin:"0px auto", color: "white"}}>
            <div style ={{
                display:"flex", 
                justifyContent: "space-around",
                margin: "38px 0px"
            }}>
                <div>
                    <h4 style={{color:"blue", fontWeight:"bold"}}>
                        {state?state.name:"loading"}
                    </h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"100%", marginLeft:"20px", color: "black"}}>
                        <h6 style={{color: "white"}}>{mypic.length} review</h6>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="gallery">
                {
                    mypic.map(item => {
                        return(
                            <div key={item._id}>
                                <p style={{color:"white", textAlign:"center", marginTop:"0px"}}>{item.body}</p>
                                <img className="item"src={item.picture} style={{width:"350px", height:"250px", marginLeft:"auto", marginRight:"auto", display:"block"}}/>
                                <p style={{color:"white", textAlign:"justify"}}>{item.title}</p> 
                                <hr></hr>
                                <br></br>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Profile;