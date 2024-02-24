import logo from '../assets/logo.jpg'
import { FcGoogle } from "react-icons/fc";
import { auth,provider } from '../firebase.js'
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch  } from 'react-redux';
import { login } from '../features/userSlice/userSlice.js'; 

const Login = () => {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogin=()=>{
        console.log('clicked');
        signInWithPopup(auth,provider)
        //logged-in
        .then((userCredentials)=>{
            const user=userCredentials.user;
            dispatch(login(user))
            navigate('/')
        })
        //failed to log-in
        .catch((error)=>{
            console.error(error.message)
        })
    }
  return (
    <div className='flex justify-center items-center h-screen w-screen'>
        <div className='bg-white shadow-2xl w-[50vw] h-[70vh] flex flex-col items-center justify-center gap-y-4 p-6'>
            <img src={logo} className='bg-white rounded-full' alt="LOGO" width={160}  />
             <h1 className='text-4xl font-bold text-purple-500 mb-2'>Welcome to my ChatApp</h1>
             <button className='border border-purple-500 hover:bg-purple-400 hover:text-white duration-150 flex gap-x-2 items-center text-2xl font-semibold text-purple-500 px-4 py-2 rounded-md
             'onClick={handleLogin}
             >Login With <FcGoogle style={{fontSize:"1.5rem"}}
             /></button>
        </div>
    </div>
  )
}
  
export default Login