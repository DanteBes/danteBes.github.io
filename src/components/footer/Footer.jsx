import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer__bar_link"]}>
        <a
          href="#"
          className={
            styles["footer__bar_link-item"] +
            " " +
            styles["footer__bar_link-item--developer"] +
            " " +
            styles["footer__bar_link-item--developer_effect"]
          }
        >
          Главный разработчик
        </a>
        <a
          href="#"
          className={
            styles["footer__bar_link-item"] +
            " " +
            styles["footer__bar_link-item--developer"] +
            " " +
            styles["footer__bar_link-item--developer_effect"]
          }
        >
          Самый лучший разработчик
        </a>
      </div>
      <div className={styles["footer__WaterMark"]}>
        <span className={styles["footer__WaterMark-text"]}>
          © 2025 Ярослав Бесфалин
        </span>
      </div>
    </footer>
  );
}
