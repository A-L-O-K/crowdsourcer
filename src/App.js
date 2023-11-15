import React, { useState } from "react";
import "./App.css";
import Profile from './profile.jsx';
import DataPage from './DataPage.jsx';

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
      <Profile/>
      <DataPage />

      {/* <SendAudio /> */}
    </div>
  );
}

export default App;