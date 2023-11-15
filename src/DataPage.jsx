import React, { useState } from 'react';

const Data = () => {
  const [recordedVoices, setRecordedVoices] = useState([]);
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(0);
  const [currentRecording, setCurrentRecording] = useState('');

  const handlePreviousVoice = () => {
    if (currentVoiceIndex > 0) {
      setCurrentVoiceIndex(currentVoiceIndex - 1);
      setCurrentRecording(recordedVoices[currentVoiceIndex - 1] || '');
    }
  };

  const handleRetryVoice = () => {
    setCurrentRecording('');
  };

  const handleNextWord = () => {
    // Implement logic to fetch the next word to record
    // For now, let's assume you have an array of words to record
    const wordsToRecord = ['Word1', 'Word2', 'Word3'];
    
    // Assuming you've recorded the current word
    setRecordedVoices([...recordedVoices, currentRecording]);

    // Move to the next word
    const nextIndex = currentVoiceIndex + 1;
    setCurrentVoiceIndex(nextIndex);
    setCurrentRecording(wordsToRecord[nextIndex] || '');
  };

  return (
    <div style={styles.dataBox}>
      <h1>Data</h1>
      <div>
        <button onClick={handlePreviousVoice}>Previous Voice</button>
        <button onClick={handleRetryVoice}>Retry Voice</button>
        <button onClick={handleNextWord}>Next Word to Record</button>
      </div>
      <div style={styles.recordingArea}>
        <textarea
          value={currentRecording}
          onChange={(e) => setCurrentRecording(e.target.value)}
          placeholder="Record your voice here..."
          rows="4"
          cols="50"
        />
      </div>
      <div>
        <p>Recorded Voices:</p>
        <ul>
          {recordedVoices.map((voice, index) => (
            <li key={index}>{voice}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  dataBox: {
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '600px',
  },
  recordingArea: {
    marginTop: '20px',
  },
};

export default Data;
