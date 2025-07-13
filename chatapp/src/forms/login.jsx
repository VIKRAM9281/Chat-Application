import { useEffect, useState } from "react"
import React from "react"
import { socket } from "../ustils/socket"
const Login = ({setisLogin,setScreenName}) => {
    const [username, setname] = useState("")
    const [pass, setpass] = useState('')

    const Handleloginres=(msg)=>{
        if(msg==="Login Success"){
            setisLogin(true)
        }else{
            setisLogin(false)
        }
    }
    useEffect(() => {
        socket.on("connect", () => {console.log("✅ Connected:", socket.id)});
        socket.on('login-responce',Handleloginres)
        return()=>{
        socket.off("connect", () => {console.log("✅ Connected:", socket.id)});
        socket.off('login-responce',Handleloginres)
        }

    }, [socket])
    const HanldleSubmit=(e)=>{
        e.preventDefault()
        setScreenName(username)
        const ID=socket.id
        console.log(ID);
        socket.emit('user-login',username,pass,ID)
    }
    return (
        <div className="container">
            <form action="" className="form1">
                <div className="fileds">
                    <label htmlFor="">UserName</label>
                    <input type="text" value={username} onChange={(e) => setname(e.target.value)} />
                </div>
                <div className="fileds">
                    <label htmlFor="">Password</label>
                    <input type="text" value={pass} onChange={(e) => setpass(e.target.value)} />
                </div>
                <button className="btnlogin" onClick={HanldleSubmit} >Login</button>
            </form>
        </div>
    )
}
export default Login