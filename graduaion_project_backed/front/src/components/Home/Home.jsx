import './style.css'
import { Outlet ,NavLink} from "react-router-dom"

export default function Home(params) {
    return (
        <div className="holder">
            <div className="sidebar">
                <h2>Pioneer</h2>
                 
                <ul>
                <li>  <NavLink to='cities' ><i className="fas fa-home"></i>Home</NavLink> </li>
                <li>  <NavLink to='cities' ><i className="fas fa-city"></i>City</NavLink> </li>
                <li>  <NavLink to='Statuses' ><i className="fas fa-dove"></i>Status</NavLink> </li>
                <li>  <NavLink to='branches' ><i className="fas fa-code-branch"></i>Branch</NavLink> </li>
                <li>  <NavLink to='states' ><i className="fas fa-flag-usa"></i>States</NavLink> </li>
                <li>  <NavLink to='AddRole' ><i className="fas fa-flag-usa"></i>AddRole</NavLink> </li>
               
              
                    {/* <li><a href="#"><i className="fas fa-home"></i>Home</a></li>
                   
                    <li><NavLink to='branches'/><i className="fas fa-user"></i>Branshes</li>
                    <li><a href="#"><i className="fas fa-address-card"></i>City</a></li>
                    <li><a href="#"><i className="fas fa-address-card"></i>State</a></li>
                    <li><a href="#"><i className="fas fa-address-card"></i></a></li>
                     */}
                </ul>

            </div>
            <div className="main_content">
                <Outlet />
            </div>
        </div>
    )
}