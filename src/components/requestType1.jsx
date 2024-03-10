import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import axios from "axios";
import { backendHost } from "./routes";


const RequestType1 = (props)=>{

    const [senderGoogleId, setSenderGoogleId] = useState()
    const [selfGoogleId, setSelfGoogleId] = useState()
    const [selfName, setSelfName] = useState()
    const [senderName, setSenderName] = useState()

    const [normalButton, setNormalButton] = useState()
    const [deleteButton, setDeleteButton] = useState()

    useEffect(()=>{
        setSenderGoogleId(props.senderGoogleId)
        setSelfGoogleId(props.selfGoogleId)
        setSelfName(props.selfName)
        setSenderName(props.senderName)
    }, [props])

    

    function startGame() {
        socket.emit("accept", socket.id, selfName, senderGoogleId, selfGoogleId)
    }

    useEffect(()=>{
        if (props.delOptToggle == true) {
            setDeleteButton("nothidden")
            setNormalButton("hidden")
        }else{
            setDeleteButton("hidden")
            setNormalButton("notHidden")
        }
    }, [props])

    return(
        
        <div className="requestType1" id={`${props.index}`}>
            <p className="inviteName">{props.senderName}</p>
            <button 
                className={`bashboardDiv1Button inviteAccept notDelete ${normalButton}`}
                onClick={()=>{startGame()}}
            >Join</button>
            <button 
                className={`bashboardDiv1Button inviteAccept deleteButton ${deleteButton}`}
                onClick={()=>{props.deleteRequest(props.senderGoogleId)}}
            ><ion-icon name="trash-bin"></ion-icon></button>
        </div>
    )
}

export default RequestType1