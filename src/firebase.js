import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA9G4Q8bHIZ1_dS7UwKcb_Kdjue2wZiieE",
  authDomain: "chatapp-cool.firebaseapp.com",
  projectId: "chatapp-cool",
  storageBucket: "chatapp-cool.appspot.com",
  messagingSenderId: "539234270031",
  appId: "1:539234270031:web:8504a92656118fd1e1633a"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
const provider=new GoogleAuthProvider();

export {auth,db,provider}