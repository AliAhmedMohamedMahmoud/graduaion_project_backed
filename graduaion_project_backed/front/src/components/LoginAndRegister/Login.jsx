import { Component, useState } from "react";
import './Login.css'
import { Link } from "react-router-dom";

import {login} from '../../Services/LogIn&Register'
import validator from "validator";
import { useNavigate } from "react-router-dom";
export default function Login()
{

    let nav = useNavigate();
    const[userName, SetUserName] = useState("")
    const[password, Setpassword] = useState("")
    
    const[IsValiduserName, SetIsValidUserName] = useState(true)
    const[IsValidpassword, SetIsValidpassword] = useState(true)


    const[ServerErrors, SetServerErrors] = useState("")
    const[ISServerErrors, SetIsServerErrors] = useState(false)
     const navigatetoregister=()=>
    {
        nav("/Register")
    }
    function HandleLogin (params) {
        if(!validator.isAlpha(userName) && validator.isEmpty(userName)&&!validator.isStrongPassword(password , {minLength: 4}) && validator.isEmpty(password))
        {
            SetIsValidUserName(false);
            SetIsValidpassword(false);
            return;
        }
        if(!validator.isAlpha(userName) && validator.isEmpty(userName))
        {
            SetIsValidUserName(false);
            return;
        }
        if(!validator.isStrongPassword(password , {minLength: 4}) && validator.isEmpty(password))
        {
            SetIsValidpassword(false);
            return;
        }
        
       login(userName,password).then(
           ({data})=>{
           localStorage.setItem("userToken",data.token);
           nav('/')
           window.location.reload()
        },
    (response)=>{
      
      SetServerErrors("User Name Or Password Not Vaild");
      SetIsServerErrors(true);
    },
   );
    }
    function HandelInputName(e) {
        SetUserName(e.target.value);
        SetIsValidUserName(true);
    }
    function HandelInputPassword(e) {
        Setpassword(e.target.value);
        SetIsValidpassword(true);
    }
    return(
        <div class="wrapper">
        <div class="logo">
            <img src="http://img0cf.b8cdn.com/images/logo/44/1996944_logo_1549715449_n.png" alt=""></img>
        </div>
        <div class="text-center mt-4 name">
            Welcome Back
        </div>
      
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input onChange={HandelInputName} type="text" name="userName" id="userName" placeholder="Username"></input>
                 {!IsValiduserName?<span className="text-danger"> User Name Is Requierd</span>:null}
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input onChange={HandelInputPassword} type="password" name="password" id="pwd" placeholder="Password"></input>
                {!IsValidpassword?<span className="text-danger"> Password Is Requierd</span>:null}
           
            </div>
                    <div>
                     {ISServerErrors?<span className="text-danger">{ServerErrors}</span>:null}
                    </div>
                    <div>
            <button class="btn mt-3 mb-3" onClick={HandleLogin}>Login</button>
            </div>
            <div>
            <button class="btn mt-3 mb-3" onClick={navigatetoregister}>
                  
                  Register
               </button>
                </div>
    </div>

    )
}