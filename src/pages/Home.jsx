import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { useEffect } from "react"; 
import { auth } from '../firebase'
import { useDispatch, useSelector } from "react-redux"; 
import { login , logout } from '../features/userSlice/userSlice'

const Home = () => {

  const dispatch=useDispatch();
  const chat=useSelector((state)=>state.room.roomId?.data?.chat);

  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      if(user){
        dispatch(login(user))
      }else{
        dispatch(logout())
      }
    });
  },[dispatch])

  return (
    <>
    <div className="flex">
    <div className="fixed overflow-y-scroll h-screen  bg-purple-500">
    <Sidebar/>
    </div>
    <div className="flex-1 bg-white ">
    <Chat chat={chat} />
    </div>
    </div>
    </>
  )
}

export default Home