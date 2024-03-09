import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import Footer from "./footer";
import Background from "./background";
import Game from "./Game";
import { socket } from "./socket";





const Winner = (props)=>{

    const [rematchFlag, setRematchFlag] = useState(false)

    function rematch(params) {
        window.location.reload()
    }

    useEffect(()=>{
        socket.on("rematch-trigger", ()=>{
            rematch()
        })
    }, [])

    return(
        rematchFlag === true? <Game 
            playerName={props.playerName} 
            opponentName={props.opponentName}
            move={props.move}
            oppMove={props.oppMove}
            moveFlag={props.moveFlag}
            senderGoogleId={props.senderGoogleId}
            senderSocketId={props.senderSocketId}
        />: 
    <div className="winnerMain">
        <NavBar />
        <Background />
        <div className="contentInfoDiv contentInfoDivWin winnerDiv">
                <p className="mainText"> {props.text} </p>
                <p className="mainText mainTextSmall winnerMainTextSmall">CONGRATULATIONS!!!!</p>
                <p className="mainText mainTextSmall winnerMainTextSmall">おめでとう！！</p>
                <button className="loginButton" onClick={()=>{
                    rematch()
                }}>Dashboard</button>
            </div>      
        <Footer />
    </div>
    )
}


export default Winner;