import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc } from "firebase/firestore";

import { app } from '../Firebase/config.js';
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
const auth = getAuth(app);
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypedPasswor, confirmRetype] = useState('');

  const navigate=useNavigate();
  // const 

  return (
    <div className="login-page">
      <h1>SignUp</h1>
      <form onSubmit={(e)=>{dataadd(e,navigate,email, password)}}>
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
async function dataadd(e,navigate, email, password) {
  const auth = getAuth(app);
  const db = getFirestore(app);
  e.preventDefault();

  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "credentials", userCredentials.user.uid), {
      email: email,
      password: password,
    });
    navigate("/");
    console.log("done");

  }
  catch (error) {
    console.error(error);
  }
}

export default Signup;