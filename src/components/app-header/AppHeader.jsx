import { Link } from "react-router-dom";
import styles from "./AppHeader.module.css";
import ThemeSwitcher from "../theme-switcher/ThemeSwitcher";

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <Link className={styles.header__titleLink} to="/">
          <h1 className={styles.title}>Ярослав Бесфалин</h1>
        </Link>
        <ThemeSwitcher />
      </div>
      <h2 className={styles.header__subtitle}>Любитель умных штук;)</h2>
    </header>
  );
}
export default AppHeader;
