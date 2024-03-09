import React from "react";
import { backendHost } from "./routes";



const NavBar = (props)=>{
    return(
        <div className="navBar">
            <span className="flex-down">
                <p className="brandNameNav">演奏する</p>
                <p className="brandNameNav">playtime</p>
            </span>
            {props.optionType == "link"? 
                <a className="navBarLeft">Login</a> : 
                <span className="navLeft">
                    <p className="navBarLeft navLeftText">{props.textValue}</p>
                    <a className="navBarLeft" href={`${backendHost}/logout`}>Logout</a>
                </span>}
        </div>
    )
}


export default NavBar;