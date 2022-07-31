import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database'
import{ getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, userAuth,
    signInWithEmailAndPassword,
createUserWithEmailAndPassword,
signOut
} from 'firebase/auth';
import {getStorage} from 'firebase/storage'

import{getFirestore, doc, getDoc, setDoc, collection, Firestore} from 'firebase/firestore'

const firebaseConfig ={
    apiKey: "AIzaSyBaVInU73hMVA-FfQwmnQDyPOp2fP3o96s",
    authDomain: "cloneinstg.firebaseapp.com",
    databaseURL: "https://cloneinstg-default-rtdb.firebaseio.com",
    projectId: "cloneinstg",
    storageBucket: "cloneinstg.appspot.com",
    messagingSenderId: "271950454131",
    appId: "1:271950454131:web:8096ead847f22661f3f906"
  };
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(); // datenbank
  const auth = getAuth();
  const storage = getStorage(app);



  export {db,auth,storage,};





