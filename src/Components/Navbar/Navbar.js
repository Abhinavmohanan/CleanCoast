import React from "react";
import "./Navbar.css";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";

const  Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <a href="default.asp">Home</a>
        </li>
        <li>
          <a href="news.asp">See</a>
        </li>
        <li>
          <a href="contact.asp">Report</a>
        </li>
        <li>
          <a onClick={()=>{signOut(auth)}}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
