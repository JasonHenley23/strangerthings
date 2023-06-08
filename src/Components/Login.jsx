import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const LoginUser = ({ setToken }) => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 




const Login  = async (event) => {
    event.preventDefault();
try {
    const response = await fetch (`https://strangers-things.herokuapp.com/api/2301-FTB-CT-WEB-PT/users/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify({ 
            user: {
                username: userName,
                password: password
            }
         })
    });
    const result = await response.json();
    setToken(result.data.token);
    localStorage.setItem('token', result.data.token);
    navigate("/profile");
} catch (err) {
    
    console.error(err);
}
}



/* async function signUpUser() {
    try{
        const response = await fetch(``)
    }
}*/


    return(
        <>
        <form class="posts"onSubmit={Login}>
            <h1 class="home">Login Page</h1>
            <p>Username:</p>
            <input value={userName} onChange={(event)=>{setUsername(event.target.value)}} placeholder="Username"></input>
            <p>Password:</p>
            <input value={password} onChange={(event)=>{setPassword(event.target.value)}}placeholder="Password"></input>
           <br></br>
            <button>Login </button>
        
        </form>
       

        
        </> 
    )
}



export default LoginUser;