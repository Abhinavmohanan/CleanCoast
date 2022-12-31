import React from "react";
import "./Navbar.css";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import {Link} from "react-router-dom"

const  Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <a onClick={()=>{signOut(auth)}}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
