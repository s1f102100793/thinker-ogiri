import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import React from 'react';
import { useAuth } from 'src/hooks/useAuth';
import { auth } from '../../utils/firebaseConfig';
import styles from './SignInbutton.module.css';

type SignInButtonProps = {
  currentPath: string;
};

export const SignInButton: React.FC<SignInButtonProps> = ({ currentPath }) => {
  const { user, loading } = useAuth();

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      console.log('provider', provider);
      console.log('auth', auth);
      const aa = await signInWithRedirect(auth, provider);
      console.log('aa', aa);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.signInButtonContainer}>
      {user ? (
        currentPath === '/createuserprofile' ? (
          <div className={styles.userContainer}>
            <div className={styles.buttonLeftPart}>{user.displayName}</div>
            <button onClick={() => auth.signOut()}>Sign Out</button>
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
