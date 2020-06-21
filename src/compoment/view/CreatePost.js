import React, {useState, useEffect} from 'react';
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
import UploadImage from './UploadImage'
const CreatePost = (props) => {
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [picture,setPicture] = useState("")
    const [url,setUrl] = useState("")
    const [urlimage,setUrlimage] = useState("")
    const [imageUrl, setImageUrl] = useState('');
    useEffect(()=>{
        if(props.mode === 'edit') {
            if(history.location.pathname.split('/')[2]) {
                fetch("https://server-review.herokuapp.com/posts/" + history.location.pathname.split('/')[2],{
                    method: "get",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": "" + localStorage.getItem("jwt")
                    }
                }).then(res => res.json())
                .then( data => {
                    setTitle(data.title)
                    setBody(data.body)
                    setImageUrl(data.picture)
                    console.log(data)
                }).catch(err => {
                    console.log(err)
                })
    
            }
        } else {
            setTitle('')
            setBody('')
            setImageUrl('')
        }
        let urlApi = 'https://server-review.herokuapp.com/createnewsfeed';
        let METHOD = "POST";
        if(props.mode === 'edit') {
            urlApi = "https://server-review.herokuapp.com/posts/" + history.location.pathname.split('/')[2];
            METHOD = 'PUT';
        }
        if(urlimage){
        fetch(urlApi,{
            method: METHOD,
            headers:{
                "Content-Type": "application/json",
                "Authorization": "" + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:urlimage
            })
        }).then(res => res.json())
        .then( data => {
            if(data.error){
                M.toast({html: data.error, classes:"red"})
            }
            else{
                M.toast({html: "Post successful", classes:"green"})
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
        }
    },[url, props])

    // const postDetails = () => {
    //     if(picture) {
    //         const data = new FormData()
    //         data.append("file", picture)
    //         data.append("upload_preset", "Swit_Reviews")
    //         data.append("cloud_name", "thanhngan83")
    //         fetch("https://api.cloudinary.com/v1_1/thanhngan83/image/upload/",{
    //             method:"post",
    //             body:data
    //         })
    //         .then(res=>res.json())
    //         .then(data => {
    //             return setUrl(data.url)
    //         })
    //         .catch(err=>{
    //             console.log(err)
    //         })
    //     }
    //     return setUrl(imageUrl);
    // }
        const postDetails = () => {
        if(urlimage) {
            const data = new FormData()
            data.append("file", urlimage)
            // data.append("upload_preset", "Swit_Reviews")
            // data.append("cloud_name", "thanhngan83")
            fetch("https://api.cloudinary.com/v1_1/thanhngan83/image/upload/",{
                method:"post",
                body:data
            })
            .then(res=>res.json())
            .then(data => {
                return setUrl(data.url)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        return setUrl(imageUrl);
    }
    const changeImageFileHandler = (event) => {
        setPicture(event.target.files[0])
        const objectUrl = URL.createObjectURL(event.target.files[0])
        setImageUrl(objectUrl)
    }

    return(
        <div className="card" 
            style={{margin:"10px auto", 
                    maxWidth:"500px", 
                    height: "360px",
                    padding:"20px", 
                    textAlign:"center"}}>
            {urlimage ? 
                <div>
                    <input type="text" 
                        placeholder="Write your review!"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        />
                    <input type="text" 
                        placeholder="The link you want to share others review!"
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        />
                    <input type="text" 
                        placeholder="ImageURL"
                        value={urlimage}
                        onChange={(event) => setUrlimage(event.target.value)}
                        />
                    <div className="col-sm-6 image">
                        <UploadImage image={`${urlimage}`} />
                    </div>
                    {/* <div className="file-field input-field">
                        <div  className="btn grey">
                            <span>Image</span>
                                <input type="file" onChange={changeImageFileHandler}
                                />
                        </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"/>
                    </div>
                    {imageUrl ? <img src={imageUrl} style={{ height: '100px', width: '100px'}}/> : null}
                    </div> */}
                    <button className="btn waves-effect waves-light blue" 
                        onClick={()=>postDetails()} >
                            Update Review
                    </button>
                </div> 
                : <div> 
                    {/* Create new review */}
                    <input type="text" 
                        placeholder="Write your review!"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        />
                    <input type="text" 
                        placeholder="The link you want to share others review!"
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        />
                    <input type="text" 
                        placeholder="ImageURL"
                        value={urlimage}
                        onChange={(event) => setUrlimage(event.target.value)}
                        />
                    <div className="col-sm-6 image">
                        <UploadImage image={`${urlimage}`} />
                    </div>
                    <div className="file-field">
                        {/* <div  className="btn grey">
                            <span>Image</span>
                            <input type="file" onChange={changeImageFileHandler}
                                    />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div> */}
                        <button className="btn waves-effect waves-light blue"
                            style={{margin:"10px auto", 
                            height: "40px",
                            marginLeft: "190px"}}
                            onClick={()=>postDetails()} >
                                Review
                        </button>
                    </div>
            </div>}
            
        </div>
    )
}

export default CreatePost;