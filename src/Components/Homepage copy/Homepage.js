import React from "react";
import './Homepage.css';
import Footer from "../Footer/Footer";
import Navbar from '../Navbar/Navbar'
import { GoogleAuthButton } from "../GoogleAuthButton/GoogleAuthButton";
function Homepage(){
    const ref = React.useRef(null);

    return(
        <div>
            <Navbar/>
            <div className="home-page-main">
                <div className="clean-coast">
                    Clean Coast
                </div>  
                <div className="desc">
                Every day, thousands of tourists visit Indian beaches, but they are
                unable to dispose of the juice bottles, snack wrappers, and other
                plastic debris they produce in an efficient manner.
                Most of the time, they litter plastic waste on the seashore. These
                plastic wastes end up in the sea, where they harm the entire marine
                ecosystem.
                Oil spills frequently kill marine mammals such as whales, dolphins,
                seals, and sea otters. Oil can clog the blowholes of whales and
                dolphins, making it impossible for them to breathe properly and
                disrupting their ability to communicate. Oil coats the fur of otters
                and seals, leaving them vulnerable to hypothermia.
                </div>  
                {<GoogleAuthButton/>}
            </div>
                <Footer/>
        </div>
    )
}
export default Homepage;
