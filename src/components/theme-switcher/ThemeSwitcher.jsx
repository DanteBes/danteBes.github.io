import { useTheme } from "../../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import styles from "./ThemeSwitcher.module.css";

function ThemeSwitcher() {
  const { effectiveTheme, changeTheme } = useTheme();

  // Показываем кнопку для переключения на противоположную тему
  // Если светлая тема → показываем Луну (для переключения на темную)
  // Если темная тема → показываем Солнце (для переключения на светлую)
  const isLight = effectiveTheme === "light";
  const toggleTheme = () => {
    changeTheme(isLight ? "dark" : "light");
  };

  return (
    <div className={styles.switcher}>
      <button
        className={styles.button}
        onClick={toggleTheme}
        aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
        title={isLight ? "Switch to dark theme" : "Switch to light theme"}
      >
        {isLight ? (
          <Moon className={styles.icon} />
        ) : (
          <Sun className={styles.icon} />
        )}
      </button>
    </div>
  );
}

export default ThemeSwitcher;
