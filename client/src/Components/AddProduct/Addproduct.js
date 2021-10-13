import React,{useState} from "react"

import "./addproduct.css"
import {SpinnerCircularSplit} from "spinners-react"
import { toast, ToastContainer } from "react-toastify"

const Addproduct=()=>{
    const token = window.localStorage.getItem("token")
    const [title,setTitle]=useState();
    const [description,setDescription]=useState();
  
    const [media,setMedia]=useState();
    const [show,setShow]=useState(false);

    const submit=async ()=>{
        setShow(true)
           const mediaUrl=await uploadimage();
           if(mediaUrl){
            const res=await fetch("/api/insert",{
                method:"POST",
                headers:{
                  "Content-Type":"application/json",
                  Authorization: token
                },
                body:JSON.stringify({
                    title,description,mediaUrl
                })
            });
            
    
            setShow(false);
            toast.success("Blog published Successfully")
           setTitle("")
           setDescription("")   
              setMedia("")
           }
         
    }
    const uploadimage=async ()=>{
           const formdata=new FormData();
           formdata.append('file',media);
           formdata.append('upload_preset',"myStore")
           formdata.append('cloud_name',"jonujonu12")
          const res= await fetch("https://api.cloudinary.com/v1_1/jonujonu12/image/upload",{
               method:"POST",
               body:formdata
           })
           const res2=await res.json();
           return res2.url
    }
   return(
         <div  className="create">
        <h3 style={{ width: "100%", textAlign:"center" }}>Add New Blog</h3>
        <img src={media?URL.createObjectURL(media):""} alt=""  className="img"/>
        <div style={{ width: "100%", display: "flex",flexDirection:"column", alignItems: "center", justifyContent: "center",marginBottom:"10px" }}>
            <input type="file" id="image" className="upload" 
            onChange={(e)=>setMedia(e.target.files[0])} />
           
        </div>

        <input type="text" placeholder="Add title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input type="textarea" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
       
        <button onClick={submit} ><span>Add...</span></button>
        <SpinnerCircularSplit enabled={show}/>
        <ToastContainer/>
    </div>
        
    )
}

export default Addproduct;

