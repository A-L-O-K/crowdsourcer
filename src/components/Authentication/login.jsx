import React, { useState } from 'react';
import './styles.css';
import { startRecording, refresh } from './script.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Validate the form fields

    // TODO: Send the login request to the backend

    // TODO: Redirect the user to the home page if the login is successful
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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

export default Login;