
import {Switch,Route,Redirect} from "react-router-dom"
import Homepage from "./Components/Homepage/Homepage"
import './App.css';
import Layout from "./Components/Layout/Layout"
import {BrowserRouter} from "react-router-dom"
import Signup from "./Components/Signup/Signup"
import Login from "./Components/Login/Login"
import Addproduct from "./Components/AddProduct/Addproduct"
import UpdateProduct from "./Components/UpdateProduct/UpdateProduct";
import UserDashBoard from "./Components/UserDashboard/UserDashBoard";
import ReadMore from "./ReadMore/ReadMore";
function App() {
  
  return (
    <div className="App">
     <BrowserRouter>
       
       <Switch>
         <Route exact path="/" >
           <Layout>
           <Homepage/>
           </Layout>
            </Route> 
  
  <Route  path="/readmore/:pid">
    <Layout>
      <ReadMore/>
    </Layout>
  </Route>



<GuestRoute path="/signup">
<Layout>
<Signup/>
</Layout>
  
</GuestRoute>

<GuestRoute path="/login">
<Layout>

 <Login/> 
</Layout>
  
</GuestRoute>


<PrivateRoute path="/addProduct">
    <Layout>
      <Addproduct/>
    </Layout>
</PrivateRoute>

<PrivateRoute path="/userDashBoard">
  <Layout>
<UserDashBoard/>
  </Layout>
</PrivateRoute>
<PrivateRoute path="/updateProduct/:id">
<Layout>
<UpdateProduct/>
</Layout>
  
</PrivateRoute>



<Redirect to="/"/>
       </Switch>
       </BrowserRouter>
    </div>
  );
}

const GuestRoute=({children,...rest})=>{
  const user=JSON.parse(window.localStorage.getItem('user'))
  return(
    <Route {...rest}
    render={()=>{
      return(
        user?<Redirect to="/"/>:(children)
      )
    }}>

    </Route>
  )
}
const PrivateRoute=({children,...rest})=>{
  const user=JSON.parse(window.localStorage.getItem('user'))
return(
  <Route {...rest} 
  render={()=>{
    return(
      user?(children):<Redirect to="/"/>
    )
    
      }}>

  </Route>
)
}
export default App;
