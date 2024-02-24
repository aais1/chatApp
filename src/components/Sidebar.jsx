import Avatar from './Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { FaArrowDown } from "react-icons/fa";
import { useEffect, useState } from 'react'; 
import { addDoc , collection ,onSnapshot,query, orderBy, serverTimestamp } from 'firebase/firestore'; 
import { setRoomId } from '../features/room/roomSlice.js';

const Sidebar = () => {
    const user = useSelector((state) => state.user.user);
    const [channelsOpen, setChannelsOpen] = useState(false);
    const [rooms,setRooms]=useState([]);

    const dispatch=useDispatch();

    const handleClick = async (e) => {
        const roomName=prompt("Enter Room Name");
            e.preventDefault();
            if (roomName.length > 1) {
              try {
                const docRef = await addDoc(collection(db, "rooms"), {
                  name: roomName,
                  uid: user?.uid,
                  timeStamp: serverTimestamp(),
                  chats: [],
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            }
          } 

useEffect(() => {
  const fetchData=async()=>{
  try{
    const q = query(collection(db, "rooms"),orderBy("timeStamp","desc"));

        onSnapshot(q,(snapshot)=>{
          setRooms(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        })
       
  }catch(err){
    console.log(err);
  }
}
fetchData();

},[])

        
    

    return (
        <div className='flex flex-col m-4 mb-8 w-[17vw] pb-8 '>
            <div className='hidden md:flex items-center gap-x-2 border-b pb-4 '>
                <span>🟢</span>
                <Avatar img={user?.photoURL} width={50} />
                <h1 className='text-white text-xl'>{user?.displayName}</h1>
            </div>
                <div className='flex gap-x-2 mt-4 text-white text-xl cursor-pointer font-semibold items-center border-purple-400 pb-4 border-b'
                onClick={()=>{setChannelsOpen(!channelsOpen)}}>
                       <FaArrowDown className={`${channelsOpen ? `rotate-180`:`rotate-0`} transition-transform duration-200 `} style={{fontSize:"1rem"}}/> Channels
                     </div>
                {
                    channelsOpen && (
                        <div className='flex flex-col gap-y-2'>
                          {
                          rooms?.map((room)=>{
                            return (
                              <div key={room.id} className='flex gap-x-2 pt-3 hover:underline text-white text-md cursor-pointer font-semibold items-center border-purple-400 pb-4 border-b'
                              onClick={()=>{
                                dispatch(setRoomId(room))
                              }}>{room.data.name}</div>
                            )
                          })

                          }
                            
                        </div>
                    )
                }
                <button className='border-purple-900 hover:bg-blue-500 hover:border-blue-500  duration-150 mx-auto p-4 rounded-lg border text-white w-[80%] mt-6 '
                onClick={handleClick}>
                    Create Chat Room
                </button>
            <div></div>
        </div>
    );
};

export default Sidebar;
