import React,{useState, useEffect} from 'react'
import './post.css'
import { Avatar, Button } from '@mui/material'
import { doc, setDoc , serverTimestamp} from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import {  onSnapshot } from 'firebase/firestore';
import {db} from '../../Utils/firebase'


function Post({imageUrl, caption, userName, postId, user}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  useEffect( () => {
    let unsubscribe;
  if(postId)
   {

      const collectionRef = collection(db,"posts",postId, "comments");
    unsubscribe = onSnapshot(collectionRef, ( snapshot)=>
    {setComments(snapshot.docs.map(doc =>({... doc.data(), id: doc.id}))); })
  }
  return() => {unsubscribe();};
  
  },[postId]);

  const postComment = (e) => {
    e.preventDefault();
    addDoc(collection(db, "posts", postId, "comments"), {
      text: comment,
      userName : user.displayName
    });

  }


  return (
    <div className='post'>
    <div className='post__header'>
         <Avatar className='post_avatar' src= '/static/images/avatar1.jpg'
    />
    <h3 className='post__avatar'>{userName}</h3>
    </div>

    
        {/*header*/}
        <img  className='post__image' src = {imageUrl} 
      alt = "instagram logo"
    />

    <h4 className='post__text'><strong>{userName}: </strong> {caption}</h4>



    <div className='post_comments'>
      {
        comments.map( comment => ( 
          <p key = {comment.id}>
            <b>{comment.userName}</b> {comment.text}
          </p>
        ))
      }
    </div>


{userName.length >0 && (
  <form className='post_commentBox'>
      <input

      className='post_input'
      type ="text"
      placeholder='Add a comment...'
      value = {comment}
      onChange = {
        (e) => setComment(e.target.value)
      }>
 </input>
 <Button
 disabled ={!comment}
 type = "submit"
 onClick={postComment}

 className='post_button'>Post</Button>
    </form>
)}
 
        
    </div>
  )
}

export default Post