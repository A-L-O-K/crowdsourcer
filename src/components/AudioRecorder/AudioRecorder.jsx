import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const recordedChunks = useRef([]);
  const recordImg = "https://cdn-icons-png.flaticon.com/512/60/60955.png";
  const stopImg = "https://cdn-icons-png.flaticon.com/512/1082/1082810.png";

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
          const blob = new Blob(recordedChunks.current, { type: 'audio/wav' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'recording.wav';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          recordedChunks.current = [];
        };

        mediaRecorder.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Error accessing the microphone:', err);
      }
    } else {
      if (mediaRecorder.current) {
        mediaRecorder.current.stop();
        setIsRecording(false);
      }
    }
  };

  return (
    <div className="record-container">
      <div className="record-button">
        <button onClick={handleRecording}>
          <img src={isRecording ? stopImg : recordImg} alt={isRecording ? 'Stop' : 'Record'} />
        </button>
      </div>
    </div>
  );  
};

export default AudioRecorder;
