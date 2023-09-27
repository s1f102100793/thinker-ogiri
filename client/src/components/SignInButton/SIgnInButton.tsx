import { signInWithPopup } from 'firebase/auth';
import { createAuth } from 'src/utils/firebase2';

const { auth, provider } = createAuth();

export const SignInButton = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console;
      const user = result.user;
      console.log(user);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

export default SignInButton;
