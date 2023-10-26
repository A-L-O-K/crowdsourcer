import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const mediaRecorder = useRef(null);
  const audioContext = useRef(null);
  const analyser = useRef(null);
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
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
          setIsRecording(false);
          cancelAnimationFrame(requestRef.current);
        };

        mediaRecorder.current.start();
        setIsRecording(true);
        visualize(stream);
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

  const visualize = (stream) => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.current.createMediaStreamSource(stream);
    analyser.current = audioContext.current.createAnalyser();
    analyser.current.fftSize = 2048;
    const bufferLength = analyser.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvasCtx = canvasRef.current.getContext('2d');
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const draw = () => {
      requestRef.current = requestAnimationFrame(draw);
      analyser.current.getByteTimeDomainData(dataArray);
      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
      canvasCtx.beginPath();

      const sliceWidth = (canvasRef.current.width * 1.0) / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvasRef.current.height) / 2;
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      canvasCtx.lineTo(canvasRef.current.width, canvasRef.current.height / 2);
      canvasCtx.stroke();
    };
    draw();
  };

  return (
    <div className="record-container">
      <canvas ref={canvasRef} width="200" height="100"></canvas>
      <div className="record-button">
        <button onClick={handleRecording}>
          <img src={isRecording ? stopImg : recordImg} alt={isRecording ? 'Stop' : 'Record'} />
        </button>
      </div>
    </div>
  );
};

export default AudioRecorder;
