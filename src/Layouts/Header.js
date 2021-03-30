import React from "react";
import {Link, NavLink} from "react-router-dom";
import logo from "../Logo/unclefixer-logo.png";
import useLocalStorage from "../LocalStorageHook";
import {NavDropdown} from "react-bootstrap";
import Navbar from './Navbar';
function Header(props) {

    const [token, setToken] = useLocalStorage('token', null);
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', true);

    let user = JSON.parse(localStorage.getItem('user'))
    console.log(user);

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.clear();
        window.location.href = "/";
    };

    console.log({isLoggedIn, token});
    return (
        <>
        <nav>
         
                <div className="logo">
                  
                        <img className="logo-img" src={logo}/>
             
                  
                </div>
   
       
        </nav>
<div className="container">
<Navbar/>
</div>
        
   </> );
}

export default Header;