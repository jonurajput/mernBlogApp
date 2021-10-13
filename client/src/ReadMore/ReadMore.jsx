import React,{useEffect,useState} from 'react'
import styles from "./ReadMore.module.css"
import { useParams } from 'react-router-dom'
import Aos from "aos";
import "aos/dist/aos.css";
const ReadMore = () => {
    const params=useParams();
    const id=params.pid;
    const [state,setState]=useState();
    useEffect(()=>{
        Aos.init({duration:1000});
        fetch(`/getBlog/${id}`).then(res=>res.json())
        .then(data1=>{
            console.log(data1)
            setState(data1)
         }).catch(error=>console.log(error));
    },[0])

    return (
        <div className={styles.showmore}>
            <div data-aos="fade-right" className={styles.img}>
                <img src={state?.data?.mediaUrl} alt=""/>
            </div>
            <div className={styles.author}>
                 <span>
                    this is title of blog</span>
              <div className={styles.second}>
                  <span>Author:{state?.data?.user?.name}</span>
                  <span>Posted At: {state?.data?.createdAt?.slice(0,10)}</span>
              </div>
            </div>
            <div data-aos="fade-left">
          {state?.data?.description}
            </div>
        </div>
    )
}

export default ReadMore
