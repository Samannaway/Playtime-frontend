import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import {Route, Routes, BrowserRouter} from "react-router-dom"
import axios from "axios"
import { backendHost, frontendHost } from "./components/routes";

const App= ()=>{

    const [status, setStatus] = useState()
    const [userName, setUsername] = useState("none")
    const [id, setId] = useState()
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        axios.get(`${backendHost}/auth/google/verify`, {withCredentials: true})
        .then(res => {
            console.log(res.data)
            if(res.data.status === "verified"){
                setStatus("verified")
                setUsername(res.data.name.toString())
                setId(res.data.id.toString())
            }else{
                setStatus("unverified")
            }

            setLoading(false)
        })
        .catch(err => console.log(err))
    }, [])

    // if (loading) {
    //     return <div>Loading...</div>;
    // }else{

    return(
    <div className="rootApp">
        <BrowserRouter>
            <Routes>
                <Route 
                    exact
                    path="/"
                    element={status == "verified"? <Dashboard userName={userName} userid={id} /> : <Home />}
                />
            </Routes>
        </BrowserRouter>
    </div>)

    // }

}

export default App