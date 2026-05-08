import { Link } from "react-router-dom";
import styles from "./AppHeader.module.css";
import ThemeSwitcher from "../theme-switcher/ThemeSwitcher";

const headerLogo = [
  "Ярослав Бесфалин",
  "Ярослав",
  "Dante Besfalin",
  "Dante",
  "Besfalin",
  "Yaroslav"
];

const textArray = [
	"hello",
	"my",
	"world",
  "👋👋👋",
  "🤪🤪🤪",
  "😮😮😮",
  "Жизнь — это искусство быть счастливым",
  "Будь собой — все роли заняты",
  "Счастье — в пути, не в цели",
  "Любовь побеждает всё",
  "Улыбка — ключ к сердцу",
  "В тишине рождается мудрость",
  "Мечтай, и пусть мечты ведут тебя",
  "Живи моментом",
  "Сердце знает ответ",
  "Мир начинается с улыбки", 
  "Всегда верь в себя",
  "Каждый миг – чудо",
  "Мир, труд, май!",
  "Как дела?",
  "Как вам сайт?",
  "🗿🗿🗿"
];

function AppHeader() {
  const n = Math.floor(Math.random() * textArray.length);
  const text = textArray[n]

  //Анимированный логотип//
  const nLogo = Math.floor(Math.random() * headerLogo.length);
  const headerRandom = headerLogo[nLogo]

  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <Link className={styles.header__titleLink} to="/">
          <h1 className={styles.title}>{headerRandom}</h1>
        </Link>
        <ThemeSwitcher />
      </div>
      <h2 className={styles.header__subtitle}>{text}</h2>
    </header>
  );
}
export default AppHeader;
