import React, { useState } from 'react';
import Header from './components/common/header';



const Data = () => {
  const [recordedVoices, setRecordedVoices] = useState([]);
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(0);
  const [currentRecording, setCurrentRecording] = useState('');

  const hindiAksharas = ['अ', 'आ', 'इ', 'ई']; // Add more Hindi aksharas as needed

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
    // Assuming you've recorded the current word
    setRecordedVoices([...recordedVoices, currentRecording]);

    // Move to the next word (Hindi akshara)
    const nextIndex = currentVoiceIndex + 1;
    setCurrentVoiceIndex(nextIndex);
    setCurrentRecording(hindiAksharas[nextIndex] || '');
  };

  return (
    <>
    <Header />
    <div className="flex flex-row gap-5">
    <div className="px-4 py-8 border-2">
      <h1>Data...</h1>
      
      <div style={styles.recordingArea}>
        {hindiAksharas.map((akshara, index) => (
          <div key={index}  className="flex flex-col">
            <div className="flex gap-4 border-4 p-2 shadow-md  text-md transition ease-in-out hover:bg-blue-500">
              {/* Add your play button icon here */}
              <span role="img" aria-label="play-button">
                ▶
              </span>
              <p>Voice Name</p>
            </div>
            
          </div>
        ))}
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

      <div className=" flex flex-col justify-evenky gap-2 border-4 p-48">
        <p>Text Content</p>
        <div className="flex gap-2">
        <div className="flex gap-4 border-4 p-2 shadow-md  text-md transition ease-in-out hover:bg-blue-500">
          <button className="border-2 border-black p-4">Prev</button> </div>
          <div className="flex gap-4 border-4 p-2 shadow-md  text-md transition ease-in-out hover:bg-blue-500">
          <button   className="border-2 border-black p-4">Retry</button></div>
          <div className="flex gap-4 border-4 p-2 shadow-md  text-md transition ease-in-out hover:bg-blue-500">
          <button  className="border-2 border-black p-4">Next</button></div>

        </div>
        </div>
      </div>
    
    </>
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
  textboxWithIcons: {
    display: 'flex',
    alignItems: 'center',
  },
  iconGroup: {
    marginRight: '10px',
    fontSize: '1.5em',
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
export default Data;
