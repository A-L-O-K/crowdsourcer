import React, { useState } from 'react';
import './styles.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypedPasswor, confirmRetype] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Validate the form fields

    // TODO: Send the login request to the backend

    // TODO: Redirect the user to the home page if the login is successful
  };

  return (
    <div className="login-page">
      <h1>SignUp</h1>
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
        <input
          type="password"
          placeholder="Retype Password"
          value={retypedPasswor}
          onChange={(event) => confirmRetype(event.target.value)}
        />
        <button type="submit" className='submit-button'>Login</button>
        <div className="siginlink">
            <p>
                Already have an account ? LogIn
            </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;