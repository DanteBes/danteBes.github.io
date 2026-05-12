import styles from "./Footer.module.css";
const year = new Date().getFullYear()
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer__bar_link"]}>
        <a
          title="Вас перенаправит на: github.com"
          href="https://github.com/DanteBes"
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
          title="Вас перенаправит на сайт моего лучшего друга, он меня выручал в трудную минуту. Бро, ты лучший! art0tod.com"
          href="https://art0tod.com"
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
          © 2025 - {year} Ярослав Бесфалин
        </span>
      </div>
    </footer>
  );
}
