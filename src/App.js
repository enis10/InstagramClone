import { collection, onSnapshot ,orderBy} from 'firebase/firestore';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import Modal from '@mui/material/Modal';
import react, {useState, useEffect} from 'react';
import './App.css';
import Post from './Komponente/Post/Post';
import {db, auth }from './Utils/firebase';
import {createUserWithEmailAndPassword, isSignInWithEmailLink}  from 'firebase/auth';
import { updateProfile ,signOut, signInWithEmailAndPassword} from "firebase/auth";
import ImageUpload from './ImageUpload';
import Test from './test';
import { query } from 'firebase/database';



function App() {
  const [posts, setPosts] = useState([]);
 


  /* User Datas*/
  const [email,setEmail] = useState(['']);
  const [password,setPassword] = useState(['']);
  const [userName,setUserName] = useState(['']);
  const [user,setUser] = useState(null);
  const [nuUser,setNuUser] = useState(false); 
  useEffect ( () => {

   auth.onAuthStateChanged((authUser) => {
      if(authUser){
        setUser(authUser)
       
      }else {
        setUser(null);

      }
    })
  },[user])






  /*  Material Ui*/

  const [open, setOPen] = useState(false);
  const [openSignIn,setOpenSignIn] = useState(false);


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const signUp = (e) =>{
  e.preventDefault();
  createUserWithEmailAndPassword(auth, email, password).catch((error) => alert(error.messsege))
  auth.onAuthStateChanged((authUser) => {

    if(authUser){

     updateProfile(authUser, {
      displayName: userName
    })
     }})
  setOPen(false)
 }


const SignIn = (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, email, password).catch(error => alert(error.messsege));
  setOpenSignIn(false);
}


/*End Material Ui */

useEffect( () => {
  const collectionRef = collection(db,"posts");
  const q = query(collectionRef,orderBy("timestamp", "desc"));
  onSnapshot(q, ( snapshot)=>
  {setPosts(snapshot.docs.map(doc =>({... doc.data(), id: doc.id}))); })
},[]);




  return (
    <div className="App">

   
   

<Modal
        open={open}
        onClose={() => setOPen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
     <Box sx={style}>
     <center>
     <img  src ="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
      alt = "instagram logo"/>
     <form className='form_input'>
     <Input placeholder='Email'  type = 'text' value={email} onChange= {(e) => setEmail(e.target.value)} />
      <Input placeholder='Password'  type = 'password'  value = {password} onChange= {(e) => setPassword(e.target.value)} />
      <Input placeholder='User Name'  type = 'text' value = {userName}  onChange= {(e) => setUserName(e.target.value)}/>
      <Button onClick = {signUp}>Sign Up</Button>
     </form>
     </center> 
        </Box>
      </Modal>



      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
     <Box sx={style}>
     <center>
     <img  src ="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
      alt = "instagram logo"/>
     <form className='form_input'>
     <Input placeholder='Email'  type = 'text' value={email} onChange= {(e) => setEmail(e.target.value)} />
      <Input placeholder='Password'  type = 'password'  value = {password} onChange= {(e) => setPassword(e.target.value)} />
      <Button onClick = {SignIn}>Sign In</Button>
     </form>
     </center> 
        </Box>
      </Modal>









    <div className='app_header'>

    <img   className = 'app_headerImage' src ="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
      alt = "instagram logo"/>

      <>
     {user ? (
      <Button onClick = {()=> signOut(auth)}>Log out</Button>
    ):(
      <div className='loginContainer'>
     <Button className = 'buttonSignIn' onClick = {() => setOpenSignIn(true)}>Sign in</Button>
     <Button onClick={ () => setOPen(true)} >Sign Up</Button> </div>
    )
    }
    </>
     
    </div>
   
    {user?(
      <ImageUpload  userName = {user}/>)
      :
      (<></>)}
    
    
  <div className='app_posts'>
   {posts.map( ( {imageUrl,userName, caption, id } )=> (<Post userName={userName} user = {user} key = {id} postId = {id} caption = {caption} imageUrl = {imageUrl} />))} 
   </div>
    </div>
    
  );
}

export default App;

