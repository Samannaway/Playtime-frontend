import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import axios from "axios";


const RequestType1 = (props)=>{

    const [senderGoogleId, setSenderGoogleId] = useState()
    const [selfGoogleId, setSelfGoogleId] = useState()
    const [selfName, setSelfName] = useState()
    const [senderName, setSenderName] = useState()

    useEffect(()=>{
        setSenderGoogleId(props.senderGoogleId)
        setSelfGoogleId(props.selfGoogleId)
        setSelfName(props.selfName)
        setSenderName(props.senderName)
    }, [props])


    function startGame() {
        socket.emit("accept", socket.id, selfName, senderGoogleId, selfGoogleId)
    }

    return(
        <div className="requestType1" id={`${props.index}`}>
            <p className="inviteName">{props.senderName}</p>
            <button 
                className="bashboardDiv1Button inviteAccept"
                onClick={()=>{startGame()}}
            >Join</button>
        </div>
    )
}

export default RequestType1