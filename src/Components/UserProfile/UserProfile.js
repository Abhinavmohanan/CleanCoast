import React, { useContext } from "react";
import './UserProfile.css';
import  Navbar  from "../Navbar/Navbar";
import { AuthUserContext } from "../../Context/AuthContext";

function UserProfile(){
    const [AuthUser,] = useContext(AuthUserContext)

    return(
        <div>
            <Navbar/>          
            <div  className="background">
                <div className="profile-main">
                        <div className="profile-box">
                            <img  alt="profile"></img>
                                <div className="data-user-input">
                                    <div className="name">
                                        <div className="name-in">
                                            Name
                                        </div>
                                    </div>
                                    <div className="name">
                                        <div className="name-in">
                                            No of wastes reported
                                        </div>
                                    </div>
                                    <div className="name">
                                        <div className="name-in">
                                            No of wastes collected
                                        </div>
                                    </div>
                                    <div className="name">
                                        <div className="name-in">
                                            Reward points
                                        </div>
                                    </div>
                                </div>
                                <div className="data-user-input">
                                    <div className="name">
                                    {AuthUser.name}
                                    </div>
                                    <div className="name">
                                        3
                                    </div>
                                    <div className="name">
                                            3
                                    </div>
                                    <div className="name">
                                            300
                                    </div>
                                </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default UserProfile;