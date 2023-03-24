import React,{useState,useRef} from "react";
import logo from './logo.svg';
import './App.css';
import {Auth} from "./Components/Auth"
import Cookies from'universal-cookie';
import {Chat} from "./Components/Chat"
import {signOut} from "firebase/auth";
import {auth} from "./firebase-config";
const cookies=new Cookies();

function App() {
  const[isAuth,setIsAuth]=useState(cookies.get("auth-token"));
  const [room,setRoom]=useState(null);
  const roomInputRef=useRef(null);
  const signUserOut=async()=>{
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth(false);
      setRoom(null);
  };
  if(!isAuth){
  return (
    <div className="App">
      <Auth setIsAuth={setIsAuth}/>
    </div>
  );
  }
  return (
    <>
      {room?(<Chat room={room}/>):(<div className="room">
        <div className="label"><label >Enter Room Name:</label></div>
       <div className="input"> <input id="roominput" ref={roomInputRef}></input>
        <button id="enterchat" onClick={()=>{setRoom(roomInputRef.current.value)}}>Enter chat</button>
        </div>
      </div>)}
      <div className="sign-out">
        <button  id="signout"onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  );
}

export default App;
