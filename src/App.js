import React, { useState } from "react";
import "./App.css";
import Profile from "./components/Profile/profile";
import DataPage from "./DataPage.jsx";

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
