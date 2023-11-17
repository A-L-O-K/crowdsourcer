import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useLocation } from 'react-router-dom';
import {  doc, setDoc ,getDoc} from "firebase/firestore";
import { app,firestore } from '../Firebase/config.js';
import './styles.css'
import AudioSender from '../AudioRecorder/AudioSender.jsx';

const Profile = () => {
  const location=useLocation();
  const navigate=useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const fetchDocument = async () => {
    try {
      const docRef = doc(firestore, "credentials",location.state.uuid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setName(docSnap.data().name);
        setEmail(docSnap.data().email);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };


  useEffect(() => {
    fetchDocument();
  }, []);
  
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const webcamRef = useRef(null);
  const uuid=location.state.uuid;
  
  const handleEditClick = () => {
    setIsEditing(true);
  };


  const isEmailUnique = (newEmail) => {
    return !savedProfiles.some((profile) => profile.email === newEmail);
  };

  const handleSaveClick = async(e) => {
    setIsEditing(false);
    const auth = getAuth(app);
    const updateref = doc(firestore, "credentials", uuid);
  e.preventDefault();

  try {
    await updateDoc(updateref, {
      name: name,
      email: email,
      region: region,
    });
    console.log("done");

  }
  catch (error) {
    console.error(error);
  }

    if (isEmailUnique(email)) {
      // Add the current profile to the list of saved profiles with the captured photo
      setSavedProfiles([...savedProfiles, { name, email, region, photo: capturedPhoto }]);
      setCapturedPhoto(null); // Reset captured photo after saving
    } else {
      alert('Email must be unique.');
    }
  };

  const handleDeleteClick = () => {
    // Delete the most recently saved profile from the list
    if (savedProfiles.length > 0) {
      const updatedProfiles = [...savedProfiles];
      updatedProfiles.pop();
      setSavedProfiles(updatedProfiles);
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 180;
    const context = canvas.getContext('2d');

    if (webcamRef.current) {
      context.drawImage(
        webcamRef.current.video,
        0,
        0,
        canvas.width,
        canvas.height
      );
    }

    const photoURL = canvas.toDataURL('image/png');
    setCapturedPhoto(photoURL);

    return photoURL;
  };

  const handleCaptureClick = () => {
    // Capture photo when the "Capture" button is clicked
    if (webcamRef.current) {
      const photoURL = capturePhoto();
      setCapturedPhoto(photoURL);
    }
  };
  const handleLogoutClick = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Capture photo when the "Capture" button is clicked
    navigate('/');
  };
  
  


  return (
    <div 
    // style={styles.profileBox} 
    className='profileDetails'>
      <div>
        <h1>Profile</h1>
      </div>
      <div 
      // style={styles.formGroup}
      >
        <label>Name:</label>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <span>{name}</span>
        )}
      </div>
      <div 
      // style={styles.formGroup}
      >
        <label>Email:</label>
        {isEditing ? (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <span>{email}</span>
        )}
      </div>
      <div style={styles.formGroup}>
        <label>Region:</label>
        {isEditing ? (
          <input
            type="text"
            value={region}

            onChange={(e) => setRegion(e.target.value)}
          />
        ) : (
          <span>{region}</span>
        )}
      </div>
      <div style={styles.formGroup}>
        {isEditing ? (
          <div style={styles.buttonGroup}>
            <button onClick={(e)=>{handleSaveClick(e)}}>Save</button>
            <button onClick={handleEditClick}>Cancel</button>
          </div>
        ) : (
          <div style={styles.buttonGroup}>
            {/* make a button which on hover */}
            <button  onClick={handleEditClick}>Edit Profile</button>
            <button onClick={handleDeleteClick}>Delete Account</button>
          </div>
        )}
      </div>

      {/* Display the captured photo before saving */}
      {capturedPhoto && (
        <div style={styles.capturedPhotoContainer}>
          <h3>Captured Photo</h3>
          <img src={capturedPhoto} alt="Captured Photo" style={styles.capturedPhoto} />
        </div>
      )}

      {/* Display the list of saved profiles */}
      {savedProfiles.length > 0 && (
        <div style={styles.savedProfiles}>
          <h2>Saved Profiles:</h2>
          <ul>
            {savedProfiles.map((profile, index) => (
              <li key={index} style={styles.savedProfileItem}>
                <div>
                  <strong>{profile.name}</strong> - {profile.email} - {profile.region}
                </div>
                {profile.photo && <img src={profile.photo} alt="Profile" style={styles.savedProfilePhoto} />}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Webcam component for capturing photos */}
      {isEditing && (
        <div style={styles.webcamContainer}>
          <h3>Take Photo</h3>
          <Webcam
            audio={false}
            height={180}
            ref={webcamRef}
            screenshotFormat="image/png"
            width={240}
          />
          <button onClick={handleCaptureClick}>Capture</button>
        </div>
      )}
    </div>
  );
};

const Data = () => {
  return (
    <AudioSender/>
  );
};

const App = () => {
  const [activePage, setActivePage] = useState('Profile');

  return (
    <div 
    // style={styles.appContainer}
    >
      <div 
      // style={styles.navBar} 
      className='navBarContainer'>
        <div
          // style={activePage === 'Profile' ? styles.activeNavItem : styles.navItem}
          onClick={() => setActivePage('Profile')} className='profile'
        >
          Profile
        </div>
        <div
          // style={activePage === 'Data' ? styles.activeNavItem : styles.navItem}
          onClick={() => setActivePage('Data')} className='data'
        >
          Data
        </div>
      </div>
      <div style={styles.pageContainer}>
        {activePage === 'Profile' && <Profile />}
        {activePage === 'Data' && <Data />}
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  navBar: {
    width: '100px',
    border: '1px solid #ccc',
    marginRight: '20px',
    textAlign: 'center',
  },
  navItem: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #ccc',
  },
  activeNavItem: {
    padding: '10px',
    cursor: 'pointer',
    backgroundColor: '#eee',
    borderBottom: '1px solid #ccc',
    fontWeight: 'bold',
  },
  pageContainer: {
    flex: 1,
  },
  profileBox: {
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: 'auto', // Center the component
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(238, 238, 238, 0.5)', // Set background color with alpha channel for transparency
    fontWeight: 'bold',
    margin: '20px',
    padding: '20px',
    borderRadius: '8px',
    marginRight: '10px',
    cursor: 'pointer',
  },
  
  // Style for buttons inside the button group
  button: {
    marginRight: '10px', // Adjust the margin-right as needed
  },
  savedProfileItem: {
    marginBottom: '10px',
  },
  savedProfilePhoto: {
    maxWidth: '100%',
    maxHeight: '100px',
    marginTop: '10px',
  },
  capturedPhotoContainer: {
    marginTop: '20px',
  },
  capturedPhoto: {
    maxWidth: '100%',
    maxHeight: '200px',
    marginTop: '10px',
  },
  webcamContainer: {
    marginTop: '20px',
  },
  savedProfiles: {
    marginTop: '20px',
  },
  dataBox: {
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '600px',
  },
};

export default App;
