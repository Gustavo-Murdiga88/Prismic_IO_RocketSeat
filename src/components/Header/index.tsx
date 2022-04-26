import Link from 'next/link';

export function Header(): JSX.Element {
  return (
    <Link href="/" prefetch>
      <a>
        <img src="/images/Logo.svg" alt="logo" width="auto" height="auto" />
      </a>
    </Link>
  );
}

export default Header;
