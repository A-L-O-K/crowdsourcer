import React, { useState, useEffect } from 'react';
import { getDownloadURL,ref } from "firebase/storage";
import {storage} from "../Firebase/config.js";

const MusicPlayer=(props)=>{
  const [audioUrl, setAudioUrl] = useState(null);
  const [audio] = useState(new Audio());
  
// Create a reference from a Google Cloud Storage URI
const gsReference = ref(storage, `gs://olx-web-app-c944d.appspot.com/audio/y3HFauiMGqPRtXL0PJnZDfR3K3a2/${props.path}.wav`);
useEffect(() => {
  const fetchAudioUrl = async () => {
    try {
      const storageRef = ref(storage, 'audio/a.wav');
      const url = await getDownloadURL(gsReference);
      setAudioUrl(url);
    } catch (error) {
      console.error('Error fetching audio URL:', error);
    }
  };

  fetchAudioUrl();
}, [props.path]);

const playPauseHandler = () => {
  if (audioUrl) {
    if (audio.paused) {
      audio.src = audioUrl;
      audio.play();
    } else {
      audio.pause();
    }
  }
};
return (
  <div>
    <button onClick={playPauseHandler}>{audio.paused ? 'Play' : 'Pause'}</button>
  </div>
);
};
export default MusicPlayer;

