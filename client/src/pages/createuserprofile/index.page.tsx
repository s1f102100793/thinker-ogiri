import { useState } from 'react';
import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';
import { useAuth } from 'src/hooks/useAuth';
import { apiClient } from 'src/utils/apiClient';
import styles from './user.module.css';

const User = () => {
  const { user } = useAuth();
  const [userId, setUserId] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
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
      <div className={styles.maincontent}>
        <div className={styles.formContainer}>
          <p className={`${styles.instructionsText} ${styles.heading}`}>プロフィール作成</p>
          <div className={styles.formList}>
            <div className={styles.formGroup}>
              <label htmlFor="userName" className={styles.label}>
                ニックネーム
              </label>
              <div className={styles.rightarea}>
                <input
                  id="userName"
                  className={styles.inputarea}
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
                <div className={styles.characterCount}>32文字以下で入力してください</div>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="userEmail" className={styles.label}>
                メールアドレス
              </label>
              <p id="userEmail" className={styles.mailaddres}>
                {user ? (user.email as string) : ''}
              </p>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>性別</label>
              <div className={styles.radioGroup}>
                <div className={styles.radioItem}>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="male">男性</label>
                </div>
                <div className={styles.radioItem}>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="female">女性</label>
                </div>
                <div className={styles.radioItem}>
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value="other"
                    checked={gender === 'other'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="other">その他</label>
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="userLocation" className={styles.label}>
                住んでいる場所
              </label>
              <input
                id="userLocation"
                className={styles.locationarea}
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.registrationButton} onClick={handleSubmit}>
                登録する
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default User;
