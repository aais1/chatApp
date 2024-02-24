import { useSelector } from "react-redux"; 
import React from "react";
import { useState } from "react";
import { arrayUnion, onSnapshot } from "firebase/firestore"; 
import { db } from "../firebase";
import { updateDoc , doc } from "firebase/firestore";

const Chat = ({chat}) => {

  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.user.user);
  const roomId = useSelector((state) => state.room?.roomId?.id);
  const roomData= useSelector((state) => state.room?.roomId?.data);

  const [messages, setMessages] = React.useState(chat);

  const handleSend = async (e) => {
    e.preventDefault();
    const ref=doc(db,"rooms",roomId);
   try{
    await updateDoc(ref,{
      chat:arrayUnion({
        message:message,
        uid:user.uid,
        photo:user.photoURL,
        email:user.email,
        displayName:user.displayName,
      })
    })
    setMessage("");
    }catch(err){
      console.log(err);
    }
}

React.useEffect(() => {
  if (roomId) {
    const roomRef = doc(db, 'rooms', roomId);

    const unsubscribe = onSnapshot(
      roomRef,
      (doc) => {
        // Assuming 'chat' is a field in the room document
        const chatData = doc.data()?.chat || []; // Default to an empty array if 'chat' is not present
        setMessages(chatData);
      }
    );

    return () => {
      // Unsubscribe when the component unmounts or roomId changes
      unsubscribe();
    }
  }
},[roomId]);

  return (
    <div className='w-[70vw] md:w-[78vw] my-4 ml-[29vw] md:ml-[22vw] max-h-[83vh] space-y-4 overflow-y-scroll mx-auto'>
      {messages?.map((message) => (
        <div key={message.uid} className="flex rounded-md bg-green-50 p-4  text-md flex-col m-1">
          <div className="flex items-center">
            {message.photo ? (
              <img src={message.photo} alt={`Profile of ${message.displayName}`} className="h-8 w-8 rounded-full" />
            ) : null}
            <p className="ml-2 font-semibold">{message.displayName}</p>
          </div>
          <p>{message.message}</p>
        </div>
      ))}
      <form onSubmit={handleSend}>
      <div className="fixed space-x-2 left-80 bottom-5 w-[100%]">
        <input
          type="text"
          placeholder="Enter Message"
          className="w-[60%]  border-2 border-purple-500 rounded-sm p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className=" border-2 border-purple-500 p-2 hover:bg-purple-500  font-semibold hover:text-white duration-150 rounded-md w-[10%] active:scale-95"
        onClick={handleSend}>
          Send
        </button>
      </div>
    </form>
    </div>
  );
}

export default Chat;
