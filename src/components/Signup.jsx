import  React,{useRef} from 'react'
import { useState,useEffect } from 'react';
import { useNavigate,Link } from "react-router-dom";

const Signup = () => {

    
    let name =useRef();
    let email =useRef();
    let password =useRef();
    let confirmpassword =useRef();
    let dob =useRef();
    let phno =useRef();
    let[verified,setVerified]=useState()
    let navigate = useNavigate();


    useEffect(()=>{
        if(localStorage.getItem("users")!=null)
        {
            navigate("/homepage")
        }
    })

   let verifyEmail=()=>{
    setTimeout(() => {
        setVerified(true)
        
    }, 2000);
}


    const handlesingup =(e)=>{
        //stop auto search
        e.preventDefault();

        if(password.current.value!=confirmpassword.current.value){
            alert("password missmatch")
            return

        }
        if(new Date() < new Date (dob.current.value))
        {
            alert("invalid dob")
            return

        }
        let newUser={
            name:name.current.value,
            email:email.current.value,
            password:password.current.value,
            phno:phno.current.value,
            dob:dob.current.value
        }
         // post the obj to the db collection
        fetch("http://localhost:4003/users" , {
                                                method : "POST",
                                                headers : {"Content-Type" : "application/json"},
                                                body : JSON.stringify(newUser)
                                            } )
        .then(()=>{
            alert("Account has been created successfully");
            navigate("/LOG IN");
        })

    



   }

    return ( 
        <div className='signup-cont'>
            <div className="signup-box">
            <h1>Sing UP</h1>

            <form onSubmit={handlesingup} >
                <input type="text"  placeholder='Enter full name' ref={name} required/>
                <input type="email"  placeholder='Enter email' ref={email} required/>
                <input type="password"  placeholder='Enter password' ref={password} required/>
                <input type="text"  placeholder='Re-enter password' ref={confirmpassword} required/>
                
                <span>DOB <input type='date'ref={dob} required></input></span>
                <input type="tel"  placeholder='Enter phoneNumber' maxLength={10} minLength={10} ref={phno} required/>
                 <input type="submit" value="Sign up" disabled={verified==false? true: false}/>
            </form>
            <button onClick={verifyEmail}>Verify email</button>
            <span>verify email to submit the form</span>
            <p>Already have an account ? <Link to="/LOG IN">Sign in</Link></p>

        </div>
        </div>
     );
}
 
export default Signup;


// const url = `https://zerobounce1.p.rapidapi.com/v2/validate?api_key=418c2114d7134bce93272c1256a38bc0&email=${email.current.value}`;
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'da3c5262d1msh6b95ea9db4859cap12d7f0jsn89c184d95366',
// 		'X-RapidAPI-Host': 'zerobounce1.p.rapidapi.com'
// 	}
// };
// fetch(url,options)
// .then((res)=>{return res.json()})
// .then((data)=>{console.log(data.status);

//     if(false)
//     {
//         setVerified(true)
//     }
//     else{
//         alert("invalid email,please enter valid one")
//     }

//     })