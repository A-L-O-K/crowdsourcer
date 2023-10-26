import logo from './logo.svg';
import './App.css';

import AudioRecorder from './components/AusioRecorder/AudioRecorder';
import Login from './components/Authentication/login';
import Signup from './components/Authentication/signup';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    // 
    <div className="App">
      <AudioRecorder />
      {/* <Login /> */}
      {/* <Signup/> */}
    </div>
  );
}

export default App;
