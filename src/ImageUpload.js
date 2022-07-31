import { Button } from "@mui/material";
import react, {useState}from "react";
import { storage,db , firebase} from "./Utils/firebase";
import { uploadBytesResumable, ref } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { doc, setDoc , serverTimestamp} from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import './ImageUpload.styles.css'

const ImageUpload = ( {userName}
    
)=>{
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState('');

    const handleChange = (e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        } }

        const handleUpload = (e) =>{
            const storageRef= ref(storage,`images/${image.name}`)
            const uploadTask = uploadBytesResumable(storageRef, image);
            
            uploadTask.on('state_changed', (snapshot) => 
            {
                const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                setProgress(prog)
            }, (err) => console.log(err), 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url =>  { addDoc(collection(db, "posts"), {
                    imageUrl: url,
                    timestamp: serverTimestamp(),
                    caption: caption,
                    userName: userName.displayName
                  });
                  setProgress(0);
                  setCaption("");
                  setImage(null);
                }
     ) } );};



    return(
        <div className="imageUpload">


     <progress  className = 'progress' value = {progress} max = "100" /> 
     <input type = 'text' placeholder="Enter a caption"
         onChange={(e) => setCaption(e.target.value)} value = {caption}/>
     
     <input type = 'file' onChange = {handleChange} />
     <h3>Upload {progress} %</h3>
     <Button  onClick = {handleUpload}>Upload</Button>
        </div>);
}
export default ImageUpload;