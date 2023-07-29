import styles from "./header.module.css";

type HeaderProps = {
  query: string;
  setQuery: (query: string) => void;
}

const Header = ({ query, setQuery }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <input className={styles.input} type="text" placeholder="Search of number" value={query} onChange={(event) => setQuery(event.target.value)} />
    </header>
  );
};

export default Header;