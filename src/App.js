import './App.css';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useState } from 'react';

function App() {
  const [audioFile, setAudioFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const storage = getStorage();
  const audioRef = ref(storage, 'audio/my-audio-file.mp3');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setAudioFile(selectedFile);
  };

  const uploadAudio = () => {
    if (audioFile) {
      setUploading(true);
      uploadBytes(audioRef, audioFile)
        .then((snapshot) => {
          console.log('Uploaded the audio file!');
          setUploading(false);
        })
        .catch((error) => {
          console.error('Error uploading the audio file:', error);
          setUploading(false);
        });
    }
  };

  return (
    <div className="App">
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={uploadAudio} disabled={uploading}>
        Upload Audio
      </button>
      {uploading && <p>Uploading...</p>}
    </div>
  );
}

export default App;
