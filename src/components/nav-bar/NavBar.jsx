import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./NavBar.module.css";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Обработка скролла к якорю после загрузки страницы
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  const handleAnchorClick = (e, anchor) => {
    e.preventDefault();
    const hash = anchor.replace("#", "");

    if (location.pathname === "/") {
      // Если уже на главной, просто скроллим
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", anchor);
      }
    } else {
      // Если не на главной, переходим на главную с якорем
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", anchor);
        }
      }, 100);
    }
  };

  return (
    <nav className={styles.menu}>
      <ul className={styles.menuList}>
        <li>
          <a
            className={styles.menuItemLink}
            href="#about"
            onClick={(e) => handleAnchorClick(e, "#about")}
          >
            <span>Обо мне</span>
          </a>
        </li>
        <li>
          <a
            className={styles.menuItemLink}
            href="#projects"
            onClick={(e) => handleAnchorClick(e, "#projects")}
          >
            <span>Проекты</span>
          </a>
        </li>
        <li>
          <a
            className={styles.menuItemLink}
            href="#interests"
            onClick={(e) => handleAnchorClick(e, "#interests")}
          >
            <span>Интересы</span>
          </a>
        </li>
        <li>
          <a
            className={styles.menuItemLink}
            href="#blog"
            onClick={(e) => handleAnchorClick(e, "#blog")}
          >
            <span>Блог</span>
          </a>
        </li>
        <li>
          <details className={styles.menuDetails}>
            <summary className={styles.menuDetailsSummary}>
              <span>Контакты</span>
            </summary>
            <ul className={styles.menuDetailsList}>
              <li>
                <a
                  className={styles.menuItemLink}
                  href="https://vk.com/besfalin_yt"
                >
                  <span>Профиль в ВК</span>
                </a>
              </li>
              <li>
                <a title="у вас откроется ютуб"
                  className={styles.menuItemLink}
                  href="https://youtube.com/@DanteBesfalin"
                >
                  <span>YouTube-канал</span>
                </a>
              </li>
              <li>
                <a className={styles.menuItemLink} href="https://tg.com">
                  <span>Телеграмм-канал</span>
                </a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
