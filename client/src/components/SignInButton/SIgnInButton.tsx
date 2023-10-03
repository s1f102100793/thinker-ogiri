import React from 'react';
import { useAuth } from 'src/hooks/useAuth';
import styles from './SignInbutton.module.css';

type SignInButtonProps = {
  currentPath: string;
};

export const SignInButton: React.FC<SignInButtonProps> = ({ currentPath }) => {
  const { user, loading, profile, signOutButton, signInWithGoogle } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.signInButtonContainer}>
      {user ? (
        currentPath !== '/createuserprofile' ? (
          <div className={styles.userContainer}>
            <div className={styles.buttonLeftPart}>{profile?.userId}</div>
            <button onClick={signOutButton}>Sign Out</button>
          </div>
        ) : (
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        )
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default SignInButton;
