import React from 'react';
import { useAuth } from 'src/hooks/useAuth';

export interface Styles {
  linklist: string;
  link: string;
  active: string;
}

interface LinkListProps {
  currentPath: string;
  styles: Styles;
}

const LinkList: React.FC<LinkListProps> = ({ currentPath, styles }) => {
  const { signOut } = useAuth();
  return (
    <div className={styles.linklist}>
      <a
        href="/"
        onClick={signOut}
        className={`${styles.link} ${currentPath === '/' ? styles.active : ''}`}
      >
        Home
      </a>
      <a
        href="/view"
        onClick={signOut}
        className={`${styles.link} ${currentPath === '/view' ? styles.active : ''}`}
      >
        View
      </a>
      <a
        href="/create"
        onClick={signOut}
        className={`${styles.link} ${currentPath === '/create' ? styles.active : ''}`}
      >
        Create
      </a>
      <a
        href="/mypage"
        onClick={signOut}
        className={`${styles.link} ${currentPath === '/mypage' ? styles.active : ''}`}
      >
        Mypage
      </a>
    </div>
  );
};

export default LinkList;
