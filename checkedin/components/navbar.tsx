"use client";


//navbar component is created to be added in the layout so that it can be used in all the pages
//it has my logo and all the links to the pages in the app


import Link from "next/link";
import { useState, useEffect } from "react";
import "./navbar.css";





export default function Navbar(){
//creating a function where it hides the navbar when user logs in to dashboard

const [isLoggedIn, setIsLoggedIn]= useState(false);
const pathname = window.location.pathname;
useEffect(()=>{
    const loggedIn = document.cookie.includes("staffUser")||
    document.cookie.includes("token");
    setIsLoggedIn(loggedIn);

},[])

const handleLogout = async()=>{
    try{
        await fetch ("/api/logout",{
            method:"POST",
        });
        setIsLoggedIn(false);
        window.location.href="/";
    }
    catch(error){
        console.error("Logout failed", error);

    

        
    }
}

  // hide navbar on dashboard pages
  if (
    pathname === "/dashboard/staff" ||
    pathname === "/dashboard/man_dash"
  ) {
    return null;
  }




    return(
        <nav className="navbar">
            <div className="logo-container">

            <img src="/logocheckedin.png" alt="CheckedIn Logo" className="logo" />
            <h1 className="logo-name">CheckedIn</h1>
            </div>
            <div className="nav-links">
                <Link href="/" >Home</Link>


                {!isLoggedIn && (
                    <>
                      <Link href="/register">Register</Link>
                      <Link href="/staff">Login</Link>
                    </>
                  

                )}

                {isLoggedIn && (
                    <>
                        <Link href="/dashboard/staff">Dashboard</Link>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </>
                )}


                
                  {/* <Link href="/aboutus">About Us</Link> */}

  

              
                

                {/* <Link href="/manager">Manager</Link> */}
            </div>
        </nav>
    )
}