import { Component } from "react";
import './Login.css'
export default function Login()
{
    return(
        <div class="wrapper">
        <div class="logo">
            <img src="http://img0cf.b8cdn.com/images/logo/44/1996944_logo_1549715449_n.png" alt=""></img>
        </div>
        <div class="text-center mt-4 name">
            Wellcom Back
        </div>
        <form class="p-3 mt-3">
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input type="text" name="userName" id="userName" placeholder="Username"></input>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Password"></input>
            </div>
            <button class="btn mt-3">Login</button>
        </form>
      
    </div>

    )
}