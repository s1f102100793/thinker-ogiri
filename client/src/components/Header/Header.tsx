import { useAuth } from 'src/hooks/useAuth';
import LinkList from '../LinkList/LinkList';
import SignInButton from '../SignInButton/SIgnInButton';
import styles from './Header.module.css';

const Header = () => {
  const { currentPath } = useAuth();

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTop}>
        <div className={styles.textBottomLeft}>Thinker</div>
        <div className={styles.signInButtonContainer}>
          <SignInButton currentPath={currentPath} />
        </div>
      </div>
      {currentPath !== '/createuserprofile' && (
        <LinkList currentPath={currentPath} styles={styles} />
      )}
    </div>
  );
};

export default Header;
