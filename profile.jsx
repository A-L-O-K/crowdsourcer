import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const Profile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [region, setRegion] = useState('US'); // Default region
  const [isEditing, setIsEditing] = useState(false);
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [photo, setPhoto] = useState(null);
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
      if (webcamRef.current) {
        const photoURL = capturePhoto();
        setPhoto(photoURL);
      }

      setSavedProfiles([...savedProfiles, { name, email, region, photo }]);
    } else {
      alert('Email must be unique.');
    }
  };

  const handleDeleteClick = () => {
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

    return canvas.toDataURL('image/png');
  };

  const handleCaptureClick = () => {
    if (webcamRef.current) {
      const capturedPhotoURL = capturePhoto();
      setCapturedPhoto(capturedPhotoURL);
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
        </div>
      )}

      {/* Display the captured photo */}
      {capturedPhoto && (
        <div style={styles.capturedPhotoContainer}>
      
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
