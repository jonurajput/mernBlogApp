import React,{useState,useEffect} from "react"
import SendIcon from '@material-ui/icons/Send';
import {SpinnerCircularSplit} from "spinners-react"
import { toast, ToastContainer } from "react-toastify"
import {useParams} from "react-router-dom"

const UpdateProduct=()=>{
    const token = window.localStorage.getItem("token")
    const params=useParams();
    const id=params.id;
    const [title,setTitle]=useState();
    const [description,setDescription]=useState();
    
    const [media,setMedia]=useState();
    const [show,setShow]=useState(false);
    const [imgsrc,setImgsrc]=useState()
    const submit=async ()=>{
        setShow(true)
        if(imgsrc){
            const res1=await fetch(`/admin/update/${id}`,{
                method:"POST",
                headers:{
                  "Content-Type":"application/json",
                  Authorization: token
                },
                body:JSON.stringify({
                   title,description,mediaUrl:imgsrc
                })
            });
            const data2=await res1.json();
            
            if(data2.err){
                setShow(false);
                toast.success(data2.err)
                return
            }
                setShow(false);
                toast.success(data2.msg)    
     }

         const mediaUrl=await uploadimage();
           if(mediaUrl){
            const res2=await fetch(`/admin/update/${id}`,{
                method:"POST",
                headers:{
                  "Content-Type":"application/json",
                  Authorization: token
                },
                body:JSON.stringify({
                    title,description,mediaUrl
                })
            });
            const dd=await res2.json()
            if(dd.err){
                setShow(false);
                toast.error(dd.err)
                return
            }
            setShow(false);
            toast.success(dd.msg)
           
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

    useEffect(() => {
        console.log(id);
        fetch(`/admin/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:token
            },
            credentials:"include"
        }).then(res=>res.json())
        .then(data1=>{
            console.log(data1)
            setTitle(data1.data.title)
            setDescription(data1.data.description)
            setImgsrc(data1.data.mediaUrl)
        })
    }, [])
   return(
       <>
        <div  className="create">
        <h3 style={{ width: "100%", textAlign:"center" }}>Update Blog</h3>
         <img src={media?URL.createObjectURL(media):imgsrc} alt="" className="img"/>
        <div style={{ width: "100%", display: "flex",flexDirection:"column", alignItems: "center", justifyContent: "center",marginBottom:"10px" }}>
            <input type="file" id="image" className="upload" 
            onChange={(e)=>setMedia(e.target.files[0])} />
           
        </div>
        <input type="text" placeholder="Add Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
       
        <button onClick={submit}><span>Update</span> </button>
        <SpinnerCircularSplit enabled={show} color="blue"/>
        <ToastContainer/>
    </div>

       </>
                
    )
}

export default UpdateProduct;
