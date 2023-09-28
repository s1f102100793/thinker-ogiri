import { useState } from 'react';
import Header from 'src/components/Header/Header';
import styles from './user.module.css';

const User = () => {
  const [userId, setUserId] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async () => {
    console.log(userId);
    console.log(gender);
    console.log(location);
  };
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.formContainer}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="UserName"
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="" disabled>
            Select gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default User;
