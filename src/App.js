import React, { useState } from "react";
import "./App.css";

import Login from './components/Authentication/login';
import Signup from './components/Authentication/signup';
import AudioSender from "./components/AudioRecorder/AudioSender";

function App() {
  return (
    <div className="App">
      {/* <Signup /> */}  
      {/* <Login /> */}
      {/* <AudioRecorder /> */}
      <AudioSender/>
      {/* <SendAudio /> */}
    </div>
  );
}

export default App;