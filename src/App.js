import React, { useState } from "react";
import "./App.css";
import Profile from "./profile.jsx";
import DataPage from "./DataPage.jsx";
import MusicPlayer from "./components/PlayAudio/MusicPlayer";
import Login from "./components/Authentication/login";
import Signup from "./components/Authentication/signup";
import AudioSender from "./components/AudioRecorder/AudioSender";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/profile" element={<Profile />} />
      
          <Route path="/SignUp" element={<Signup />} />
        </Routes>
        
        {/* <MusicPlayer prop={'gs://olx-web-app-c944d.appspot.com/audio/y3HFauiMGqPRtXL0PJnZDfR3K3a2'}/> */}
        {/* <Signup /> */}
        {/* <Login /> */}
        {/* <AudioRecorder /> */}
        {/* <AudioSender/> */}
        {/* <Profile/> */}
        {/* <DataPage /> */}

        {/* <SendAudio /> */}
      </Router>
    </div>
  );
}

export default App;
