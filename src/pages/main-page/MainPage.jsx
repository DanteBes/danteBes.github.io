import { Link } from "react-router-dom";
import styles from "./MainPage.module.css";
import avatar from "../../assets/images/avatar.jpeg";
import { useEffect, useState } from "react";
import { getLatestPost } from "../../utils/blogUtils";

function MainPage() {
  const [latestPost, setLatestPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLatestPost = async () => {
      try {
        const post = await getLatestPost();
        setLatestPost(post);
      } catch (error) {
        console.error('Ошибка загрузки последнего поста:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLatestPost();
  }, []);

  // Обработка скролла к якорю при загрузке страницы
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
            псевдонимом Dante Besfalin. Мне 23 года (на 2024 год). Родился я в
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
      <section className={`${styles.section} ${styles.blog}`} id="blog">
        <h2 className={styles.section__title}>Блог</h2>
        {loading ? (
          <p className={styles.section__text}>Загрузка...</p>
        ) : latestPost ? (
          <ul className={styles.blogs_list}>
            <li className={styles.blogs_item}>
              <article className={styles.post}>
                <Link
                  to={`/blogs/${latestPost.slug}`}
                  className={styles.post__sender}
                >
                  {latestPost.title}
                </Link>
                <div className={styles.post__button}>
                  <Link
                    to="/blogs"
                    className={styles.post__button_link}
                  >
                    Читать далее
                    <span className={styles.post__button_icon}>&gt;</span>
                  </Link>
                </div>
              </article>
            </li>
          </ul>
        ) : (
          <p className={styles.section__text}>Пока нет постов в блоге.</p>
        )}
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
    </main>
  );
}

export default MainPage;
