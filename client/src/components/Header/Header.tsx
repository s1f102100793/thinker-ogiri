import LinkList from '../LinkList/LinkList';
import styles from './Header.module.css';

const Header = () => {
  const currentPath = window.location.pathname;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTop}>
        <div className={styles.textBottomLeft}>Thinker</div>
      </div>
      <LinkList currentPath={currentPath} styles={styles} />
    </div>
  );
};

export default Header;
