import React, { useRef } from 'react';
/*
id="image"
type="file"
placeholder="Enter image"
value={selectedFile}
onChange={(e) => setSelectedFile(e.target.value)}
required
*/

/*
<FileUploader>
onFileSelectSuccess = {(file) => setSelectedFile(file)}
onFileSelectError = {({error}) => alert(error)}
</FileUploader>
*/

export default function FileUploader({onFileSelectError, onFileSelectSuccess}) {
  const fileInput = useRef(null); // useRef: initialize an object with default value, which exists full time in this componentz
  const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file.size/1024/1024> 2){
            onFileSelectError({error: "File size cannot exceed more than 2MB"});
        } else{
            onFileSelectSuccess(file);
        }
        
    }
  // what does this onclick mean?
  return (
    <div className = "file-uploader">
      <input type="file" onChange={handleFileInput}></input>
      <button onClick = {e => fileInput.current && fileInput.current.click()} className="btn btn-primary"></button>
    </div>
  );
}