import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import Footer from "./footer";
import Background from "./background";
import axios from "axios";
import { backendHost } from "./routes";
import RequestType1 from "./requestType1";
import { socket } from "./socket";
import Game from "./Game";


const Dashboard = (props)=>{

    const [userName, setUserName] = useState()
    const [userId, setUserId] = useState()
    const [requests, setRequests] = useState(["hi"])
    const [requestReciever, setRequestReciever] = useState()
    const [jobInitial, setJobInitial] = useState(false)
    const [gameFlag, setGameFlag] = useState(false)

    const [senderName, setSenderName] = useState()
    const [senderGoogleId, setSenderGoogleId] = useState()
    const [senderSocketId, setSenderSocketId] = useState()
    const [selfMove, setSelfMove] = useState()
    const [moveFlag, setMoveFlag] = useState()
    const [oppMove, setOppMove] = useState()

    useEffect(()=>{
        socket.connect()
        setUserName(props.userName)
        setUserId(props.userid)

        axios.post(`${backendHost}/requests`, {googleId: props.userid})
        .then(res => {
            setRequests(res.data)
        })
        .catch(err => {
            console.log(err);
        })

        setJobInitial(true)
    }, [])


    function initializeGame(senderSocketId, senderGoogleId, senderName) {

        setSenderSocketId(senderSocketId)
        setSenderGoogleId(senderGoogleId)
        setSenderName(senderName)

        setGameFlag(true)
    
    }

    useEffect(()=>{

        socket.on("request-accepted", (senderSocketId, senderGoogleId, senderName)=>{
            initializeGame(senderSocketId, senderGoogleId, senderName)
            setSelfMove("o")
            setMoveFlag(false)
            setOppMove("x")
        })

        socket.on("online-verified", (senderSocketId, senderGoogleId, senderName)=>{
            initializeGame(senderSocketId, senderGoogleId, senderName)
            setSelfMove("x")
            setOppMove("o")
            setMoveFlag(true)
        })

    }, [])


    useEffect(()=>{
        jobInitial === true && socket.emit("connection-success", userName, userId)
    }, [jobInitial])


    function makeRequest(name) {
        axios.post(`${backendHost}/makeRequest`, 
        {
            sender: userName, 
            reciever: requestReciever, 
            googleIdSender: userId, 
            socketId: socket.id
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

        setRequestReciever("")
    }


    
    return(
        gameFlag === true ? <Game 
            playerName={userName} 
            opponentName={senderName}
            move={selfMove}
            oppMove={oppMove}
            moveFlag={moveFlag}
            senderGoogleId={senderGoogleId}
            senderSocketId={senderSocketId}
        /> :
        <div className="dashBoardMain homeMain">
            <NavBar optionType={"text"} textValue={userName}/>
            <p className="mainText mainText-Dashboard">Tic Tac Toe</p>
            <Background />
            <div className="Dashboard-options">
                <div className="dashboardDiv1 inviteDiv">
                    <p className="dashboardDiv1Text ">Make a request</p>
                    <input 
                        className="dashboardDiv1Input"
                        placeholder="write their id"
                        value={requestReciever}
                        onChange={(e)=>setRequestReciever(e.target.value)}
                    ></input>
                    <button 
                        className="bashboardDiv1Button"
                        onClick={()=>{makeRequest(requestReciever)}}
                    >Send</button>

                    <span className="cardFooter">
                        <p className="cardFooterText">遊ぼう！</p>
                        <p className="cardFooterText">let's play!</p>
                    </span>
                </div>



                <div className="dashboardDiv1 requestDiv">
                    <p className="dashboardDiv1Text ">Join requests</p>
                    <div className="requests">
                        
                        {
                            requests.map((elem, index)=>{
                                return (<RequestType1 
                                    index={index} 
                                    senderName={elem.name} 
                                    senderGoogleId={elem.googleId} 
                                    selfGoogleId={userId}
                                    selfName={userName}
                                />)
                            })
                        }

                    </div>
                </div>



            </div>
            <Footer />
        </div>
    )

}


export default Dashboard