import './style.css'
import { Outlet } from "react-router-dom"
export default function Home(params) {
    return (
        <div class="holder">
            <div class="sidebar">
                <h2>PIoPIo</h2>
                 
                <ul>
                    <li><a href="#"><i class="fas fa-home"></i>Home</a></li>
                   
                    <li><a href="#"><i class="fas fa-user"></i>Branshes</a></li>
                    <li><a href="#"><i class="fas fa-address-card"></i>City</a></li>
                    <li><a href="#"><i class="fas fa-address-card"></i>State</a></li>
                    <li><a href="#"><i class="fas fa-address-card"></i></a></li>
                    
                </ul>

            </div>
            <div class="main_content">
                <Outlet />
            </div>
        </div>
    )
}