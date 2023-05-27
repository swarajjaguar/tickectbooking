import  React,{useRef} from 'react'
import { useState } from 'react';
import { useNavigate,Link } from "react-router-dom";


const Login = () => {

    let email =useRef();
    let password =useRef();
    let navigate = useNavigate();

    const handleLogin =(e)=>{
        //stop auto search
        e.preventDefault();
        fetch("http://localhost:4003/users")
        .then(res => res.json())
        .then((data)=>{
            let user=data.find((user)=>{return user.email===email.current.value})
            console.log(user);

            if(user==undefined)
            {
                alert("user not found")
            }
            else if(user.password!=password.current.value)
            {
                alert("inavalid password")
            }
            else{
                alert("login sucessfull")
                localStorage.setItem("users",JSON.stringify(user))
                navigate("/homepage")
            }
        })

   }

    return ( 
        <div className='login-cont'>
            <div className="login-box">
            <h1>LOG IN</h1>

            <form onSubmit={handleLogin} >
                
                <input type="email"  placeholder='Enter email' ref={email} required/>
                <input type="password"  placeholder='Enter password' ref={password} required/>
               
                 <input type="submit" value="LOG IN" />
            </form>
            <span>Dont have an account ?  </span>
                <Link to="/"><button>Create account</button></Link>
           

        </div>
        </div>
     );
}
 
export default Login;


