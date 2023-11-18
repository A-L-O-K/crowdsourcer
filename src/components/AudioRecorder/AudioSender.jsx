import React, { useState, useRef, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage} from "../Firebase/config";
import { getDoc,setDoc,doc } from "firebase/firestore";
import './AudioSender.css'
import { wait } from "@testing-library/user-event/dist/utils";
import { getAuth} from "firebase/auth";
import { app } from "../Firebase/config";

function AudioSender() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorder = useRef(null);
  const [a, seta] = useState("")
  // const db
  const [checked, setChecked] = useState(false);
  const auth = getAuth();

  // useEffect(()

  const recordedChunks = useRef([]);
  const [first, setfirst] = useState("")
  // const storageRef = ref(storage, "audio/");
  const recordImg = "https://cdn-icons-png.flaticon.com/512/60/60955.png";
  const stopImg = "https://cdn-icons-png.flaticon.com/512/1082/1082810.png";
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedFile(file);
  // };
  const array2=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  // useEffect(() => {
  //   const reference = doc(app, "users", auth.currentUser.uid);
  //   getDoc(reference).then((docSnap) => {
  //     if (docSnap.exists()) {
  //       console.log("Document data:", docSnap.data());
  //       setfirst(docSnap.data().name)
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   });}, [])
    
  const handleRecording = async (e,letter) => {
    seta(letter)
    const storageRef = ref(storage, `audio/${auth.currentUser.uid}/${letter}.wav`);

    
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
          uploadAudio(blob,storageRef);
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
        seta("")
      }
    }
  };
  const playAudio = () => {
    
  };
  const uploadAudio = (audioBlob,storageRef) => {
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
      <div>
    
      {array2.map((letter) => (
        <div>

        <button onClick={(e)=>{handleRecording(e,letter)}}>
    {letter === a ? (
      <img
      src={isPlaying ? "https://imgs.search.brave.com/94zz8bQ3Ipr0-XIdOXCPHjIj9LPsVDQubyzS8Sb6T3E/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzg0LzcwLzU1/LzM2MF9GXzE4NDcw/NTU1N18yZXg3ZWgz/NU1VV1Z0b2hlTTNR/Tk8xNE52VFpBZWpm/Vy5qcGc"
        : "https://as2.ftcdn.net/v2/jpg/01/75/02/99/1000_F_175029918_lZThlHzCNYdvoykGWtckxT7wksSa71ji.jpg"}
        alt="some description"
        />
        ) : (
      <img src="https://as2.ftcdn.net/v2/jpg/01/75/02/99/1000_F_175029918_lZThlHzCNYdvoykGWtckxT7wksSa71ji.jpg" alt="some description" />
      )}
        </button>
              <button onClick={(e)=>{handleRecording(e,letter)}}>
    {letter === a ? (
      <img
      src={isRecording ? stopImg : recordImg}
        alt="some description"
        />
        ) : (
      <img src={recordImg} alt="some description" />
      )}
          <div><label>
        {/* <input type="checkbox" />
         */}
{/* CHECKBOX WITH VALUE TRUE */}
         <input type="checkbox" checked={checked}
        ></input>
        {' '}
      </label>{letter}</div>
        </button>
      </div>
      ))}
      </div>
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