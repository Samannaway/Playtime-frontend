import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import Footer from "./footer";
import Background from "./background";
import { socket } from "./socket";
import Winner from "./Winner";


const Game = (props)=>{

    const [moveFlag, setMoveFlag] = useState() // inverse values are used true=false and false=true
    const [senderGoogleId, setSenderGoogleId] = useState()
    const [senderSocketId, setSenderSocketId] = useState()
    const [timer, setTimer] = useState(10)
    const [conclusionFlag, setConlusionFlag] = useState(false)
    const [conclusion, setConclusion] = useState("")

    const [winMov, setWinMove] = useState(
        [
            {val1:"11", val2:"12", val3:"13", winVal:0},
            {val2:"11", val3:"22", val3:"33", winVal:0},
            {val1: "11", val2:"21", val3:"31", winVal: 0},
            {val1: "21", val2:"22", val3:"23", winVal: 0},
            {val1: "31", val2:"22", val3:"13", winVal: 0},
            {val1: "31", val2:"32", val3:"33", winVal: 0},
            {val1: "32", val2:"22", val3:"12", winVal: 0},
            {val1: "33", val2:"23", val3:"13", winVal: 0},
        ]
    )

    let [blocks, setBlocks] = useState(0)


    const [disabledId, setDisabledId] = useState([""])
    useEffect(()=>{
        
        setMoveFlag(props.moveFlag)
        setSenderGoogleId(props.senderGoogleId)
        setSenderSocketId(props.senderSocketId)

    }, [props])

    
    useEffect(()=>{
        disabledId.forEach(e => {
            try{
                document.getElementById(`${e}`).disabled=true    
            }catch(e){}
        })
    }, [disabledId])


    useEffect(() => {
        if (!moveFlag) {

            if (!conclusionFlag) {
                let timerCount = 10
                const intervalId = setInterval(() => {
                    setTimer(prev => prev-=1)
                    timerCount--
                    if (timerCount <= 0) {
                        console.log("timed out bro :)" + timer);
                        clearInterval(intervalId)
                        setConclusion(`${props.playerName} got timed out :(`)
                        setConlusionFlag(true)
                        socket.emit("time-out", senderSocketId, props.playerName)
                    }
                }, 1000);
    
                
                
                return () => {
                    clearInterval(intervalId)
                    setTimer(10)
                }; 
            }
        }
    }, [moveFlag]);


    useEffect(()=>{

        socket.on("move-made", (moveId)=>{
            setMoveFlag(false)
            setDisabledId(prevItems => [...prevItems, moveId])
            try{
                document.getElementById(`${moveId}img`).src=`./images/${props.oppMove}.png`
            }catch(err){}
        })

        let uniqueCount = new Set(disabledId).size
        if (uniqueCount === 10) {
            setMoveFlag(true)
            setConlusionFlag(true)
            setConclusion("it's a draw!!!")    
        }

    }, [disabledId])



    function winVal(id) {

        winMov.forEach(e => {
            if (e.val1 === id || e.val2 === id || e.val3 === id) {
                e.winVal+=1
                if (e.winVal === 3) {
                    socket.emit("game-win", senderSocketId, props.playerName)
                    setConclusion(`${props.playerName} won !!!`)
                    setConlusionFlag(true)
                    console.log(conclusion);
                    console.log(conclusionFlag);
                }
            }
        })
        
    }


    useEffect(()=>{

        socket.on("game-win-trigger", (winnerName)=>{
            setConclusion(`${winnerName} won !!!`)
            setConlusionFlag(true)
        })
    
        socket.on("time-out-trigger", (outPerson)=>{
            setConclusion(`${outPerson} got timed out :(`)
            setConlusionFlag(true)
        })

    }, [])

    function makeMove(moveId) {
        winVal(moveId)
        
        setMoveFlag(true)

        setDisabledId(prevItems => [...prevItems, moveId])

        socket.emit("move-make", senderSocketId, moveId)
        document.getElementById(`${moveId}img`).src=`./images/${props.move}.png`

    }


    return(
        conclusionFlag === true? <Winner 
            text={conclusion}
            playerName={props.playerName} 
            opponentName={props.opponentName}
            move={props.move}
            oppMove={props.oppMove}
            moveFlag={props.moveFlag}
            senderGoogleId={props.senderGoogleId}
            senderSocketId={props.senderSocketId}
        /> :
        <div className="gameDiv homeMain">
            <NavBar />
            <Background />
                <span className="GameLeftTopTextArea">
                    <p className="GameLeftTopText">{props.playerName} vs {props.opponentName}</p>
                    <p className="GameLeftTopText playModeText">行こうよ！！！</p>
                </span>
            <div className="gameArea">
            
                <div className="playMode">
                    <p className="dashboardDiv1Text playModeText">You Are</p>
                    <img className="playModeImg" src={`./images/${props.move}.png`}></img>
                </div>
                
                {/* sorry for the repetative code lol */}
                
                <div className="ticTacToeArea">
                    <div className="ticTacToeRow" id="1">
                        <button onClick={(e)=>makeMove(e.target.id)} disabled={moveFlag} className="PlayMoves" id="11">
                            <img className="moveImg" id="11img" src={""}></img>
                        </button>
                        <button onClick={(e)=>makeMove(e.target.id)} disabled={moveFlag} className="PlayMoves" id="12">
                            <img className="moveImg" id="12img" src={""}></img>
                        </button>
                        <button onClick={(e)=>makeMove(e.target.id)} disabled={moveFlag} className="PlayMoves" id="13">
                            <img className="moveImg" id="13img" src={""}></img>
                        </button>
                    </div>
                    <div className="ticTacToeRow" id="2">
                        <button onClick={(e)=>makeMove(e.target.id)} disabled={moveFlag} className="PlayMoves" id="21">
                            <img className="moveImg" id="21img" src={""}></img>
                        </button>
                        <button onClick={(e)=>makeMove(e.target.id)} disabled={moveFlag} className="PlayMoves" id="22">
                            <img className="moveImg" id="22img" src={""}></img>
                        </button>
                        <button onClick={(e)=>makeMove(e.target.id)} disabled={moveFlag} className="PlayMoves" id="23">
                            <img className="moveImg" id="23img" src={""}></img>
                        </button>
                    </div>
                    <div className="ticTacToeRow" id="3">
                        <button onClick={(e)=>makeMove(e.target.id)} disabled={moveFlag} className="PlayMoves" id="31">
                            <img className="moveImg" id="31img" src={""}></img>
                        </button>
                        <button onClick={(e)=>makeMove(e.target.id)} disabled={moveFlag} className="PlayMoves" id="32">
                            <img className="moveImg" id="32img" src={""}></img>
                        </button>
                        <button onClick={(e)=>makeMove(e.target.id)} disabled={moveFlag} className="PlayMoves" id="33">
                            <img className="moveImg" id="33img" src={""}></img>
                        </button>
                    </div>
                </div>


                
                
                <div className="playMode playModeTimer">
                    <p className="dashboardDiv1Text playModeText">Timer</p>
                    <div className="requestType1 timerArea">
                            <p className="inviteName timerText">Time Left</p>
                            <a className="bashboardDiv1Button inviteAccept timerTime">{timer}</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Game;