import './style.css'
import { Outlet ,NavLink, useNavigate} from "react-router-dom"
import {decoder} from '../../common/baseUrl'
import { useEffect, useState } from 'react'
export default function Home(params) {
    const navigate=useNavigate()
    let[role,SetRole]=useState("");
    const whenClick=()=>{
        localStorage.removeItem("userToken")
        navigate("/Login")
    }
    useEffect(()=>{
        SetRole(decoder(localStorage.getItem("userToken")).role)  
        console.log(role)
    },[])
    return (
        <div className="holder">
            <div className="sidebar">
                <h2>Pioneer</h2>
                <ul>
                <li>  <NavLink to='/Main' ><i className="fas fa-home"></i>Home</NavLink> </li>
                {role.includes('ADM')||role.includes('EMP')? <>
                <li>  <NavLink to='cities' ><i className="fas fa-city"></i>City</NavLink> </li>
                <li>  <NavLink to='Statuses' ><i className="fas fa-dove"></i>Status</NavLink> </li>
                <li>  <NavLink to='branches' ><i className="fas fa-code-branch"></i>Branch</NavLink> </li>
                <li>  <NavLink to='states' ><i className="fas fa-flag-usa"></i>States</NavLink> </li>
                <li>  <NavLink to='AddRole' ><i className="fas fa-flag-usa"></i>AddRole</NavLink> </li>
                <li>  <NavLink to='Register' ><i className="fas fa-user"></i>Add User</NavLink> </li>
                <li>  <NavLink to='WeightSetting' ><i className="fas fa-flag-usa"></i>WeghtSetting</NavLink> </li>
                </>:null}
                <li>  <NavLink to='Orders' ><i className="fas fa-dove"></i>Orders</NavLink> </li>
                <li>  <a style={{cursor:"pointer"}} onClick={whenClick} to='Orders' ><i className="fas fa-dove"></i>logOut</a> </li>
                </ul>
            </div>
            <div className="main_content">
                <Outlet />
            </div>
        </div>
    )
}