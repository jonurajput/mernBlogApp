import styles from "./Card.module.css"
import React,{useState,useEffect} from "react"
import {Link} from "react-router-dom"
import Aos from "aos";
import "aos/dist/aos.css";

const Card=({prop})=>{
    
    
  

    useEffect(()=>{
       Aos.init({duration:1500});
    },[0])
    return(
        <>
            
            <div data-aos="zoom-in" className={styles.card} style={{backgroundImage:`url(${prop.mediaUrl})`}}>
              <span className={styles.title}>{prop.title} </span>
              <span className={styles.detail}>{prop.description}
              </span>
              <Link to={`/readmore/${prop._id}`}> <button className={styles.btn}>READ MORE</button></Link>
             </div>
            
        </>
     
    )
}

export default Card;