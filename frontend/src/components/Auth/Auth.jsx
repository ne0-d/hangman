import React, { useState } from 'react'
import "./Auth.scss"
import * as AuthApi from "../../AuthRequests";
import { Navigate, useNavigate } from 'react-router-dom';

const Auth = () => {
    let loading = false;
    const [loginData, setLoginData] = useState({ username: ""});
    const navigate = useNavigate();

    const handleAuth = async (e)=>{
        // e.preventDefault();
        loading=true;
        try {
          const response = await AuthApi.logIn(loginData);
          console.log(response);
          if(response){
            localStorage.setItem('userh', JSON.stringify(response.data));
            window.location.reload(false);
          }
          
        } catch (error) {
            setLoginData({ username: ""})
            if(error.response.status===500)
                alert("Some internal error occured, try again later :(")
        }
        loading=false
      }
    return (
        <div class="auth">

            <div className="auth-head">
                <h1 class="neon header neonText" data-text="U">HA<span class="flicker-slow">N</span>G<span class="flicker-fast">M</span>AN</h1>
                
                <h3 class="neon small" data-text="U">THIS G<span class="flicker-fast">A</span>M<span class="flicker-slow">E</span> IS SERI<span class="flicker-slow">OUS</span> THAN YO<span class="flicker-slow">U</span> THIN<span class="flicker-fast">K!</span></h3>
            </div>
            <div className='auth-form'>
                <h2 className='neon'>INPUT <span class="flicker-slow">USER</span>NAME TO PLAY</h2>
                <input type="text" className='form-data' name="username" value={loginData.username} onChange={(e)=>{setLoginData({ ...loginData, [e.target.name]: e.target.value })}} />
                <button className='neon-btn home-btn' onClick={handleAuth} disabled={loading} >{loading ? "Loading...":"ENTER"}</button>
            </div>
    
        </div>
    )
}

export default Auth