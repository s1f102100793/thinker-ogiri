import LinkList from '../LinkList/LinkList';
import SignInButton from '../SignInButton/SIgnInButton';
import styles from './Header.module.css';

const Header = () => {
  const currentPath = window.location.pathname;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTop}>
        <div className={styles.textBottomLeft}>Thinker</div>
        <div className={styles.signInButtonContainer}>
          <SignInButton />
        </div>
      </div>
      <LinkList currentPath={currentPath} styles={styles} />
    </div>
  );
};

export default Header;
