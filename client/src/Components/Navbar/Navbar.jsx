import styles from "./Navbar.module.css"
import { useState} from "react"
import { Link, useHistory } from "react-router-dom"

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
const Navbar = () => {
    const history = useHistory();
    const token = window.localStorage.getItem("token")
    const user = JSON.parse(window.localStorage.getItem('user'))
   const [show,setShow]=useState(false)
  
    //logout
    const logout = async () => {

        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const res2 = await res.json();
        if (res2.msg) {
            window.localStorage.clear();
            history.push("/login")
        }
    }

    
    return (

        <div className={styles.navbar}>
             <div className={styles.nav}>
                <div className={styles.first}>
                   <Link to="/">
                   Blogs
  </Link>                 </div>
                <div className={styles.second}>
                {show?<ArrowDropUpIcon onClick={()=>setShow(false)}/>:<ArrowDropDownIcon onClick={()=>setShow(true)}/>}
                
              
                </div>
            
             </div> 
             <div className={show?styles.dropdown:styles.dropdown2}>
                     <span style={{display:"flex",alignItems:"center"}}><AccountCircleIcon className={styles.icon}/> <span className={styles.span}>{user?user.email:<Link to="/login">Login</Link>}</span></span>
                     {
                         token?  <Link to="/addProduct">
                     <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><AddIcon className={styles.icon2}/><span className={styles.span2}>Add New Blog</span> </div>
                     </Link>:  <Link to="/login">
                     <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><AddIcon className={styles.icon2}/><span className={styles.span2}>Add New Blog</span> </div>
                     </Link>
                     }
                     {
                         token?  <Link to="/userDashBoard">
                     <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><InsertDriveFileIcon className={styles.icon2}/><span className={styles.span2}>Account</span> </div>
                     </Link>:  <Link to="/login">
                     <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><InsertDriveFileIcon className={styles.icon2}/><span className={styles.span2}>Account</span> </div>
                     </Link>
                     }
                   {
                       token?  <div style={{display:"flex",alignItems:"center",justifyContent:"center",paddingLeft:"8px"}} onClick={logout}> <ExitToAppIcon className={styles.icon2}/><span className={styles.span2}>Logout</span></div>
                       :<> <Link to="/login">
                     <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><LockOpenIcon className={styles.icon2}/><span className={styles.span2}>Login</span> </div>
                     </Link>
                      <Link to="/signup">
                     <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><VpnKeyIcon className={styles.icon2}/><span className={styles.span2}>Signup</span> </div>
                     </Link></>
                   }


                </div>
        </div>

    )
}


export default Navbar;


