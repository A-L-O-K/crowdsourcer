import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const Profile = () => {
  const [name, setName] = useState('Sasi');
  const [email, setEmail] = useState('crowdsource@example.com');
  const [region, setRegion] = useState('uganda'); 
  const [isEditing, setIsEditing] = useState(false);
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const webcamRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const isEmailUnique = (newEmail) => {
    return !savedProfiles.some((profile) => profile.email === newEmail);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

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

  return (
    <div style={styles.profileBox}>
      <h1>Profile</h1>
      <div style={styles.formGroup}>
        <label>Name: </label>
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
      <div style={styles.formGroup}>
        <label>Email: </label>
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
        <label>Region: </label>
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
          <>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleEditClick}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEditClick}>Edit Profile</button>
            <button onClick={handleDeleteClick}>Delete Account</button>
            
          </>
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
              <li key={index}>
                <div>
                  <strong>{profile.name}</strong> - {profile.email} - {profile.region}
                </div>
                {profile.photo && <img src={profile.photo} alt="Profile" style={styles.photo} />}
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

        </div>)}
        {/* Display the captured photo */}
      {capturedPhoto && (
        <div style={styles.capturedPhotoContainer}>
          <h3>Captured Photo</h3>
          <img src={capturedPhoto} alt="Captured" style={styles.capturedPhoto} />
        </div>
      )}
    </div>
  );
};

const styles = {
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
  },
  savedProfiles: {
    marginTop: '20px',
  },
  photo: {
    maxWidth: '100%',
    maxHeight: '100px',
    marginTop: '10px',
  },
  webcamContainer: {
    marginTop: '20px',
  },
  capturedPhotoContainer: {
    marginTop: '20px',
  },
  capturedPhoto: {
    maxWidth: '100%',
    maxHeight: '200px',
    marginTop: '10px',
  },
};

export default Profile;
