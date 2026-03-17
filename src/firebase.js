
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut} from "firebase/auth";
import { addDoc, 
  collection, 
  getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVnHraJXdmiuSzmDznSpxOf6YrhYMFN1U",
  authDomain: "netflix-clone-af3ca.firebaseapp.com",
  projectId: "netflix-clone-af3ca",
  storageBucket: "netflix-clone-af3ca.firebasestorage.app",
  messagingSenderId: "665092383615",
  appId: "1:665092383615:web:c879d938228b293fc1b04a",
  measurementId: "G-9F0YBKCTBF"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
 try{
 const res = await createUserWithEmailAndPassword(auth, email, password);
 const user = res.user;
 await addDoc(collection(db, "user"), {
   uid: user.uid,
   authProvider : "local",
   email,
 });
 } catch (error) {
    console.log(error);
    alert(error);
 }
}

const login = async(email,password)=> {
   try{
    await signInWithEmailAndPassword(auth, email, password)
   } catch (error) {
     console.log(error);
     alert(error);
   }
}

const logout = ()=> {
  signOut(auth);
}

export{auth, db, login, signup, logout};