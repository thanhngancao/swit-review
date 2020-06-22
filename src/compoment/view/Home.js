import React,{useState, useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link, withRouter} from 'react-router-dom'

const Home = (props) => {
    const [data, setData] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('https://server-review.herokuapp.com/newsfeed',{
            headers:{
                "Authorization": "" + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result => {
            setData(result.posts)
        })
    },[])
    const makeComment = (text, postId) =>{
        fetch('https://server-review.herokuapp.com/comment', {
            method:"put",
            headers:{
                "Content-Type":"application/json", 
                "Authorization": "" + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = data.map(item => {
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }

    const deletePost = (postid) => {
        fetch(`https://server-review.herokuapp.com/deletepost/${postid}`,{
            method:"delete",
            headers:{
                "Authorization": "" + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newdata = data.filter(item => {
                return item._id !== result._id
            })
            setData(newdata)
        })
    }
    const updatePostHandler = (postId) => {
        props.history.push('/edit-post/' + postId);
    }
    return(
        <div className="home">
            {data && data.length > 0 ? 
                data.map(item => {
                    return(
                        <div className="card home-card" key={item._id}>
                            <h6 style={{margin:"10px", fontWeight:"bold", fontSize:"20px", color:"blue", textAlign: "center"}}>
                                {state ? 
                                <div>
                                    {item.postedBy ? item.postedBy.name: ''}
                                    {item.postedBy && item.postedBy._id == state._id &&
                                    <i className="material-icons" style={{float:"right", cursor: 'pointer'}}
                                        onClick={() => deletePost(item._id)}>
                                        delete
                                    </i>
                                    }
                                    {item.postedBy && item.postedBy._id == state._id && 
                                    <i className="material-icons" style={{float:"right", cursor: 'pointer'}}
                                        onClick={() => updatePostHandler(item._id)}>
                                        edit
                                    </i>
                                    }
                                </div>
                                : item.postedBy ? item.postedBy.name : null
                                }

                                
                            <hr></hr>
                            </h6>
                            <p style={{margin:"10px", fontSize:"15px", textAlign: "center"}}>{item.body}</p>
                        <div className="card-image">
                            <img src={item.picture} style={{width:"350px", height:"250px", marginLeft:"auto", marginRight:"auto", display:"block"}}/>
                        </div>
                        <div className="card-content">
                            <h6 style={{margin:"10px", fontSize:"15px", textAlign: "justify"}}>{item.title}</h6>
                            <hr></hr>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                makeComment(e.target[0].value, item._id)
                            }}>
                                <input type="text" placeholder="Write your opinion!"/>
                            </form>
                            {
                                item.comments.map(record => {
                                    return(
                                    <h6 key={record._id}>
                                        <span style={{fontWeight:"bold", color:"blue"}}>
                                        {record.postedBy.name}
                                        </span><span>   </span>
                                        {record.text}
                                    </h6>
                                    )
                                })
                            }
                        </div>
                        </div>
                    )
                })
            : null}
        </div>
    )
}

export default withRouter(Home);