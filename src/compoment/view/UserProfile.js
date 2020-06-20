import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const Profile = () => {
    const [userProfile, setProfile] = useState(null)
    const {state, dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showFollow, setFollow] = useState(state?!state.following.includes(userid):true)
    
    // check info
    //console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`, {
            headers:{
                "Authorization": "" + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            // check for result
            //console.log(result)
            //
            
            setProfile(result)
        })

    },[])

    //make a follower user
    const followUser = () => {
        fetch('/follow', {
            method:"put",
            headers:{
                "Content-Type":"application/json", 
                "Authorization": "" + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data => {
            //console.log(data)
            dispatch({type:"UPDATE", 
                    payload:{
                        following:data.following, 
                        followers:data.followers
                    }
            })
            localStorage.setItem("user", JSON.stringify(data))
            setProfile((prevState) => {
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers:[...prevState.user.followers, data._id]
                    }
                }
            }) 
            setFollow(false) 
        })
    }

    //make a unfollower user
    const unfollowUser = () => {
        fetch('/unfollow', {
            method:"put",
            headers:{
                "Content-Type":"application/json", 
                "Authorization": "" + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data => {
            //console.log(data)
            dispatch({type:"UPDATE", 
                    payload:{
                        following:data.following, 
                        followers:data.followers
                    }
            })
            localStorage.setItem("user", JSON.stringify(data))
            
            setProfile((prevState) => {
                const newFollower = prevState.user.followers.filter(item => item != data._id)
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setFollow(true)
        })
    }

    return(
        <>
        {
            userProfile ?
            // loading  
            <div style={{maxWidth:"700px", margin:"0px auto"}}>
            <div style ={{
                display:"flex",
                justifyContent: "space-around",
                margin: "38px 0px"
            }}>
                <div>
                    <img style={{width:"160px", height:"160px", borderRadius:"80px"}}
                    src={userProfile.user.pic}/>
                </div>
                <div>
                    <h4>
                        {userProfile.user.name}
                    </h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"100%",marginLeft:"20px"}}>
                        <h6>{userProfile.posts.length} post</h6>
                        <h6>{userProfile.user.followers.length} followers</h6>
                        <h6>{userProfile.user.following.length} following</h6>
                    </div>
                    {
                        showFollow 
                            ? 
                            <button style={{margin:"10px"}} className="btn waves-effect waves-light grey"
                            onClick={() => followUser()}>
                                Follow
                            </button>
                            :
                            <button style={{margin:"10px"}} className="btn waves-effect waves-light grey"
                            onClick={() => unfollowUser()}>
                                Unfollow
                            </button>
                    }
                </div>
            </div>
            <div className="gallery">
                {
                    userProfile.posts.map(item => {
                        return(
                            <img key={item._id} className="item" src={item.picture} alt={item.title}/>
                        )
                    })
                }
            </div>
        </div>
        // before loading
            : 
            <div className="preloader-wrapper active center">
            <div className="spinner-layer spinner-red-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        }
        
        </>
    )
}

export default Profile;