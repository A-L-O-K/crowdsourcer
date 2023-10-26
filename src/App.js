import React, { useState } from "react";
import "./App.css";

import AudioRecorder from './components/AudioRecorder/AudioRecorder';
import Login from './components/Authentication/login';
import Signup from './components/Authentication/signup';
import SendAudio from "./components/AudioRecorder/sendAudioToFirebase";

function App() {
  return (
    <div className="App">
      {/* <Signup /> */}
      {/* <Login /> */}
      <AudioRecorder />
      {/* <SendAudio /> */}
    </div>
  );
}

export default App;