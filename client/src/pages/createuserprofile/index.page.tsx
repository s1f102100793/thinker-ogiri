import { useState } from 'react';
import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';
import { useAuth } from 'src/hooks/useAuth';
import { apiClient } from 'src/utils/apiClient';
import styles from './user.module.css';

const User = () => {
  const { user, router } = useAuth();
  const [userId, setUserId] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState<{
    userId?: string;
    gender?: string;
    location?: string;
    mailAddress?: string;
  }>({});
  const MAX_USERID_LENGTH = 32;

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    if (user === null) {
      return;
    }

    const UserModel = {
      userId,
      mailAddress: user.email as string,
      location,
      gender,
      totallike: 0,
      otherUserLike: [],
    };

    const response = await apiClient.profile.userprofile.$post({ body: UserModel });

    if (response.error !== null) {
      const apiErrors = parseApiErrors(response.error);
      console.log(apiErrors);
      setError(apiErrors);
    } else {
      router.push('/');
    }
  };

  const validateForm = () => {
    const errors: { userId?: string; gender?: string; location?: string } = {};

    if (userId.length < 1 || userId.length > MAX_USERID_LENGTH) {
      errors.userId = `※1文字以上 ${MAX_USERID_LENGTH}文字以下にしてください`;
    }

    if (!gender) {
      errors.gender = '※性別を選択してください。';
    }

    if (!location) {
      errors.location = '※住んでいる場所を入力してください。';
    }

    return errors;
  };

  const parseApiErrors = (errorMessage: string) => {
    const errors: { userId?: string; gender?: string; location?: string; mailAddress?: string } =
      {};

    if (errorMessage.includes('The userId is already taken.')) {
      errors.userId = '※このニックネームは既に使われています。';
    }
    if (errorMessage.includes('The mailAddress is already taken.')) {
      errors.mailAddress = '※このメールアドレスは既に使われています。';
    }

    return errors;
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
                <div className={styles.characterCount}>
                  {MAX_USERID_LENGTH}文字以下で入力してください
                  {error.userId !== null && <div className={styles.errorMsg}>{error.userId}</div>}
                </div>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="userEmail" className={styles.label}>
                メールアドレス
              </label>
              <div className={styles.rightarea}>
                <p id="userEmail" className={styles.mailaddres}>
                  {user ? (user.email as string) : ''}
                </p>
                {error.mailAddress !== null && (
                  <div className={styles.errorMsg}>{error.mailAddress}</div>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>性別</label>
              <div className={styles.rightarea}>
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
                {error.gender !== null && <div className={styles.errorMsg}>{error.gender}</div>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="userLocation" className={styles.label}>
                住んでいる場所
              </label>
              <div className={styles.rightarea}>
                <input
                  id="userLocation"
                  className={styles.locationarea}
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {error.location !== null && <div className={styles.errorMsg}>{error.location}</div>}
              </div>
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
