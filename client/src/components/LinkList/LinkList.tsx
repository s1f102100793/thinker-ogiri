import React from 'react';

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
  return (
    <div className={styles.linklist}>
      <a href="/" className={`${styles.link} ${currentPath === '/' ? styles.active : ''}`}>
        Home
      </a>
      <a href="/view" className={`${styles.link} ${currentPath === '/view/' ? styles.active : ''}`}>
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
  );
};

export default LinkList;
