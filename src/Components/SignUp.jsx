import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({setToken}) => {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();




const Register = async (event) => {
    event.preventDefault();
try {
    const response = await fetch (`https://strangers-things.herokuapp.com/api/2301-FTB-CT-WEB-PT/users/register`, {
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
    console.log(result);
    // setToken(result.data.token);
    navigate("/login");
    // return result
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
        <form class="posts" onSubmit={Register}>
            <h1 class="home"> Sign Up Page </h1>
            <p>Username:</p>
            <input value={userName} onChange={(event)=>{setUsername(event.target.value)}} placeholder="Username"></input>
            <p>Password:</p>
            <input value={password} onChange={(event)=>{setPassword(event.target.value)}}placeholder="Password"></input>
            <p> Confirm Password: </p>
            <input value={confirmPassword} onChange={(event)=>{setConfirmPassword(event.target.value)}}placeholder="Confirm Password"></input>
            <br></br>
            <button>Submit</button>
        </form>
       

        
        </> 
    )
}



export default SignUp;