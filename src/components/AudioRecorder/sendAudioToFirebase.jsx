import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../Firebase/config";

function SendAudio() {
  const [selectedFile, setSelectedFile] = useState(null);

  const storageRef = ref(storage, "audio/myAudio.mp3");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Upload the selected audio file to Firebase Storage
      uploadBytes(storageRef, selectedFile)
        .then((snapshot) => {
          console.log("Audio uploaded successfully!");

          // Get the download URL for the uploaded audio
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              console.log("Audio download URL:", downloadURL);

              // You can use the downloadURL to play or further process the audio
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        })
        .catch((error) => {
          console.error("Error uploading audio:", error);
        });
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Audio</button>
    </div>
  );
}

export default SendAudio;