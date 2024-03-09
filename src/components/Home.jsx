import React from "react";
import Background from "./background";
import Footer from "./footer";
import NavBar from "./Navbar";
import { backendHost } from "./routes";

const Home = ()=>{

    return(

        <div className="homeMain">
            <NavBar optionType={"link"}/>
            <img src="./images/background.png" className="backgroundImg"></img>
            <img src="/images/arrows.png" className="arrowImage"></img>
            <div className="contentInfoDiv">
                <p className="mainText">Tic Tac Toe</p>
                <p className="mainText mainTextSmall">online</p>
                <a className="loginButton" href={`${backendHost}/auth/google/`}>login</a>
            </div>                
            <Background />
            <Footer />
        </div>
    )
}

export default Home;