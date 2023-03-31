import {useState,useEffect} from "react";
import {addDoc,collection,serverTimestamp,onSnapshot,query,where, orderBy} from "firebase/firestore";
import {auth,db} from "../firebase-config"
import "../styles/Chat.css"
export const Chat=(props)=>{
    const{room}=props;
    const [newMessage,setNewMessage]=useState("");
    const [messages,setMessages]=useState([]);
    const messagesRef=collection(db,"messages");
    // listen to every change that will occur
    useEffect(()=>{
           const queryMessages=query(messagesRef,
            where("room","==",room)
            ,orderBy("createdAt")
            );
          const unsubscribe= onSnapshot(queryMessages,(snapshot)=>{
            // console.log("NEW MESSAGE");
            let messages=[];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(),id:doc.id});
            });
            setMessages(messages);
           });
       return ()=>unsubscribe();
    },[])
    const handleSubmit=async(e)=>{
        // to prevent reloading of page 
        e.preventDefault();
        console.log(newMessage);
        if(newMessage==="") return;
        // adding msg to database with 4 details
        await addDoc(messagesRef,{
            text:newMessage,
            // time at which message is created
            createdAt:serverTimestamp(),
            user:auth.currentUser.displayName,
            room
        });
        setNewMessage("");
    };

    return( <div className="chat-app">
         {/* to handle event after submitting  form */}
         <div className="header">
            <h1> Room :{room.toUpperCase()}</h1>
         </div>
         {/* to display messages */}
         <div className="messages">{messages.map((message)=>(
            <div className="message" key={message.id}>
                {/* to add user name and time stamp */}
                <span className="user">{message.user}</span>
                {message.text}
            </div>
         ))}</div>
        <form onSubmit={handleSubmit} className="new-message-form">
             <input
             className="new-message-input"
             placeholder="Type your message here...."
             onChange={(e)=>setNewMessage(e.target.value)}
             value={newMessage}
             ></input>
             <button type="submit" className="send-button">
              Send
             </button>
        </form>
    </div>);
};