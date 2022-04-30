import Link from 'next/link';
import styles from './header.module.scss';

export function Header(): JSX.Element {
  return (
    <div className={styles.main}>
      <Link href="/" prefetch>
        <a>
          <img src="/images/Logo.svg" alt="logo" width="auto" height="auto" />
        </a>
      </Link>
    </div>
  );
}

export default Header;
