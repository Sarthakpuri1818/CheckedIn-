//navbar component is created to be added in the layout so that it can be used in all the pages
//it has my logo and all the links to the pages in the app


import Link from "next/link";

import "./navbar.css";





export default function Navbar(){
    return(
        <nav className="navbar">
            <div className="logo-container">

            <img src="/logocheckedin.png" alt="CheckedIn Logo" className="logo" />
            <h1 className="logo-name">CheckedIn</h1>
            </div>
            <div className="nav-links">
                <Link href="/" >Home</Link>
                <Link href="/register">Register</Link>
                  <Link href="/staff">Login</Link>
                  <Link href="/aboutus">About Us</Link>

  

              
                

                {/* <Link href="/manager">Manager</Link> */}
            </div>
        </nav>
    )
}