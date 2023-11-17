import React, { useState } from 'react';
import './styles.css';
import { startRecording, refresh } from './script.js';
import { app } from '../Firebase/config.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); 
  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={(e) => Abc(navigate,e, email, password)}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" className='submit-button'>Login</button>
        <div className="siginlink">
            <p>
                Don't have an account ? SignUp
            </p>
        </div>
        <div className='captcha'>
            <div className='captcha-box'>
                <div className='captcha-text'>
                    <p>captcha</p>
                </div>
                <div className='captcha-refresh'>
                    <button type='button' className='captcha-refresh-btn' onClick={refresh}>
                        <img src='https://cdn-icons-png.flaticon.com/128/1082/1082454.png'/>
                    </button>
                </div>
                <div className="record-btn">
                    <button type='button' onClick={startRecording}>
                        <img src='https://cdn-icons-png.flaticon.com/128/4181/4181174.png'/>
                    </button>
                </div>
            </div>
        </div>
      </form>
    </div>
  );
};

async function Abc(navigate,e,email,password){    
  e.preventDefault();
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("logged in");
    console.log({ auth });
    console.log(userCredential);

    const user = userCredential.user;
    const uuid = user.uid; // Access the uid from userCredential

    // Check if user is signed in before navigating
    if (user) {
      navigate('/profile', { state: { "uuid": uuid } });
    } else {
      // Handle the case where user is not signed in
      console.log("User not signed in");
    }
  } catch (error) {
    navigate('/SignUp');
    console.log(error);
  } 
};
export default Login; 