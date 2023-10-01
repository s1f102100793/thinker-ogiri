import { useState } from 'react';
import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';
import { useAuth } from 'src/hooks/useAuth';
import { apiClient } from 'src/utils/apiClient';
import styles from './user.module.css';

const User = () => {
  const { user, auth, router } = useAuth();
  const [userId, setUserId] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    console.log(userId);
    console.log(gender);
    console.log(location);
    console.log(user);
    if (!user) return;
    const UserModel = {
      userId,
      mailAddress: user.email as string,
      location,
      gender,
      totallike: 0,
      otherUserLike: [],
    };
    const response = await apiClient.userprofile.$post({ body: UserModel });
    console.log(response);
    if (response.error !== null) {
      console.log(response.error);
      setError(response.error);
    } else {
      console.log('success');
      setError(null);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.formContainer}>
        <p className={`${styles.instructionsText} ${styles.heading}`}>プロフィール作成</p>
        <div className={styles.formList}>
          <div className={styles.formGroup}>
            <label htmlFor="userName" className={styles.label}>
              ニックネーム
            </label>
            <input
              id="userName"
              className={styles.hoge}
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="UserName"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="userEmail" className={styles.label}>
              メールアドレス
            </label>
            <p id="userEmail" className={styles.hoge}>
              {user ? (user.email as string) : ''}
            </p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="userGender" className={styles.label}>
              性別
            </label>
            <select
              id="userGender"
              value={gender}
              className={styles.hoge}
              onChange={(e) => setGender(e.target.value)}
            >
              {/* ... options ... */}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="userLocation" className={styles.label}>
              住んでいる場所
            </label>
            <input
              id="userLocation"
              className={styles.hoge}
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </div>
          {/* {error !== null && error.includes('mailAddress') && (
          <div className={styles.error}>このメールアドレスは既に使われています。</div>
        )} */}
          <button className={styles.hoge} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default User;
