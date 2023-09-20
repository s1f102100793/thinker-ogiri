import { faSquareGithub, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Footer.module.css';

const Footer = () => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.textTopLeft}>Thinker</div>
      </div>

      <div className={styles.column}>
        <a href="https://twitter.com/mctabetai_0905" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faSquareXTwitter} size="2x" style={{ color: '#fff' }} />
        </a>
        <a
          href="https://github.com/s1f102100793/thinker-ogiri"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faSquareGithub} size="2x" style={{ color: '#fff' }} />
        </a>
      </div>
      <div className={styles.column}>
        {' '}
        <a href="/" className={`${styles.link} ${currentPath === '/' ? styles.active : ''}`}>
          Home
        </a>
        <a
          href="/view"
          className={`${styles.link} ${currentPath === '/view/' ? styles.active : ''}`}
        >
          View
        </a>
        <a
          href="/create"
          className={`${styles.link} ${currentPath === '/create/' ? styles.active : ''}`}
        >
          Create
        </a>
        <a
          href="/outstanding"
          className={`${styles.link} ${currentPath === '/outstanding/' ? styles.active : ''}`}
        >
          Outstanding
        </a>
      </div>

      <div className={styles.rightColumn}>
        <button className={styles.topButton} onClick={scrollToTop}>
          <FontAwesomeIcon icon={faUpLong} size="3x" style={{ color: '#434343' }} />
        </button>
      </div>
    </div>
  );
};

export default Footer;
