import { useState } from "react";
import styles from "./VerticalNavBar.module.css";
import burger from '../../assets/images/list.svg'

export function VerticalNavBar() {
  const [ isOpen, setOpen ] = useState(false);

  return (
    <>
    <img className={styles.burger} src={burger} onClick={() => setOpen(true)}></img>
    <div className={styles.right_side} onClick={() => setOpen(false)}></div>
      
    {isOpen &&
    <nav className={styles.menu}>
      <ul className={styles.menuList}>
        <li>
          <a className={styles.menuItemLink} href="#about">
            <span>Обо мне</span>
          </a>
        </li>
        <li>
          <a className={styles.menuItemLink} href="#projects">
            <span>Проекты</span>
          </a>
        </li>
        <li>
          <a className={styles.menuItemLink} href="#interests">
            <span>Интересы</span>
          </a>
        </li>
        <li>
          <a className={styles.menuItemLink} href="#blog">
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
                <a
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
    }
      </>
  );
}
