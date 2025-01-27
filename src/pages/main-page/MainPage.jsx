import { Link } from "react-router";
import styles from "./MainPage.module.css";
import avatar from "../../assets/images/avatar.jpeg";
import { useEffect } from "react";

function MainPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className={styles.content}>
      <section className={`${styles.section} ${styles.about}`} id="about">
        <h2 className={styles.section__title}>Обо мне</h2>
        <div className={styles.section_about__wrapper}>
          <a
            className={styles.section_about__link}
            href="https://vk.com/besfalin_yt"
            target="_blank"
          >
            <img
              className={styles.section_about__image}
              src={avatar}
              width="64"
              alt="Avatar"
            />
          </a>
          <p className={styles.section__text}>
            Всем привет! Меня зовут Ярослав Бесфалин, в интернете я известен под
            псевдонимом Dante Besfalinn. Мне 23 года (на 2024 год). Родился я в
            городе Выборг в 2001 году. При рождении произошла осложненная
            ситуация: я задушился пуповиной, и мне поставили диагноз ДЦП
            (детский церебральный паралич). Этот диагноз принес множество
            проблем: я не умею ходить, не очень хорошо управляю руками и говорю,
            что затрудняет мое общение с незнакомыми людьми. Родные понимают
            меня без труда, но с чужими приходится просить помощи в переводе.
            <Link
              to="/about"
              className={`${styles.section__link} ${styles.section__text_link} ${styles.section__text_link_active}`}
            >
              Подробнее
            </Link>
          </p>
        </div>
      </section>
      <section className={`${styles.section} ${styles.projects}`} id="projects">
        <h2 className={styles.section__title}>Проекты</h2>
        <p className={styles.section__text}>Скоро...</p>
      </section>
      <section
        className={`${styles.section} ${styles.interests}`}
        id="interests"
      >
        <h2 className={styles.section__title}>Интересы</h2>
        <p className={styles.section__text}>Скоро...</p>
      </section>
      <section className={`${styles.section} ${styles.blog}`} id="blog">
        <h2 className={styles.section__title}>Блог</h2>
        <ul className={styles.blogs_list}>
          <li className={styles.blogs_item}>
            <article className={styles.post}>
              <span className={styles.post__sender}>
                Dante Besfalin | Мобильный gaming и многое другое
              </span>
              <div className={styles.post__content}>
                <div className={styles.post__text}>
                  <div className={styles.post__quote}>
                    <span className={styles.post__quote_text}>
                      Дополнение к опросу
                    </span>
                  </div>
                  Я хочу сделать максимально разнообразный контент, чтобы канал
                  сильно отличался от сообщества в ВКонтакте, чтобы каждому было
                  интересно. Вон, даже мембота купил
                </div>
              </div>
              <div className={styles.post__date}>11:49</div>
              <div className={styles.post__button}>
                <a
                  href="https://t.me/dantebesfalin"
                  className={styles.post__button_link}
                  target="_blank"
                >
                  Комментировать
                  <span className={styles.post__button_icon}>&gt;</span>
                </a>
              </div>
            </article>
          </li>
        </ul>
        <p className={styles.section__text}></p>
      </section>
    </main>
  );
}

export default MainPage;
