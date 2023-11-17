import React, { useState, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage} from "../Firebase/config";
import './AudioSender.css'
import { wait } from "@testing-library/user-event/dist/utils";

function AudioSender() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);
  const [first, setfirst] = useState("")
  const storageRef = ref(storage, "audio/myAudio.mp3");
  const recordImg = "https://cdn-icons-png.flaticon.com/512/60/60955.png";
  const stopImg = "https://cdn-icons-png.flaticon.com/512/1082/1082810.png";
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedFile(file);
  // };

  const handleRecording = async () => {
    
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            recordedChunks.current.push(e.data);
          }
        };

        mediaRecorder.current.onstop = () => {
          const blob = new Blob(recordedChunks.current, { type: "audio/wav" });
          uploadAudio(blob);
          recordedChunks.current = [];
          setfirst("audio uploaded sucessfully")
          wait(3000).then(() => {
            setfirst("")
          })  
          
        };

        mediaRecorder.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing the microphone:", err);
      }
    } else {
      if (mediaRecorder.current) {
        mediaRecorder.current.stop();
        setIsRecording(false);
      }
    }
  };

  const uploadAudio = (audioBlob) => {
    if (selectedFile || audioBlob) {
      const blobToUpload = audioBlob || selectedFile;
      // Upload the selected audio file or the recorded audio Blob to Firebase Storage
      uploadBytes(storageRef, blobToUpload)
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
    <div className="record-container">
        <div className="record-button">
        <button onClick={handleRecording}>
            <img src={isRecording ? stopImg : recordImg} alt={isRecording ? 'Stop' : 'Record'} />
            <div>{first}</div>
        </button>
        </div>
    </div>
  );
}

export default AudioSender;