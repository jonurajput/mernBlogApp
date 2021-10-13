import React,{useState,useEffect} from 'react'
import styles from "./UserDashBoard.module.css"

import {Link} from "react-router-dom"
const UserDashBoard = () => {
    const token = window.localStorage.getItem("token")
    const user = JSON.parse(window.localStorage.getItem('user'))
    const [prod,setProd]=useState()
    useEffect(()=>{
         fetch("/admin/data",{
             method:"GET",
             headers:{
                 "Content-Type":"application/json",
                 Authorization:token
             },
             credentials:"include"
         }).then((res)=>res.json())
         .then(data=>{
             
             setProd(data.product)
             console.log(data.product)
            }).catch(err=>console.log(err))

    },[])

    const remove=async (productId)=>{
        try{
            const res= await fetch("/admin/delete",{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:token
                 },
                 credentials:"include",
                 body:JSON.stringify({productId})
            });
            const data=await res.json()
        
             setProd(data.product)
        }catch(err){
            console.log(err);
        }
     
    }
    return (
        
            
            <div className={styles.admin}>
        {prod?.map((item)=>{
            return(
                <>
                
                <div className={styles.eachProduct} key={item._id}>
            <div className={styles.first}>
                <img className={styles.img} src={item.mediaUrl} alt=""/>
                <span>{item.name}</span>
            </div>
            <div className={styles.second}>
                <div className={styles.second_first}>
                  
                    <span>{item.place}</span>
                </div>
                <div className={styles.second_first}>
                    <span style={{fontWeight:"600"}}>Posted At</span>
                    <span>{item.createdAt.slice(0,10)}</span>
                </div>
            </div>
            <div className={styles.third}>
               <Link to={`/updateProduct/${item._id}`}> <button className={styles.btn1}>Edit</button></Link>
                <button className={styles.btn2} onClick={()=>remove(item._id)}>Delete</button>
            </div>
        </div>

                </>
            )
        })}
              </div>

        
          )
}

export default UserDashBoard
