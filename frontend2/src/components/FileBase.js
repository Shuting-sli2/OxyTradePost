import firebase from 'firebase/app'
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADmD_z94mkhYsHjo9PXF7oCIuJG4YBC0w",
    authDomain: "oxytradepost-image-upload.firebaseapp.com",
    projectId: "oxytradepost-image-upload",
    storageBucket: "oxytradepost-image-upload.appspot.com",
    messagingSenderId: "313038145745",
    appId: "1:313038145745:web:3bcc086c5ce746403d9df0",
    measurementId: "G-1ZYL5257J2"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export {storage, firebase as defualt};


const FileBase = () => {
  const handleChange = e => {
    if (e.target.file[0]){

    }
  }
  const handleUpload = () => {
  }
  return (
    <div>
      <input type = "file" onchange = {handleChange}/>
      <button onClick = {handleUpload}>Upload</button>
    </div>
  )
}
export default FileBase;
