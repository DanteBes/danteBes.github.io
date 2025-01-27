function NavBar() {
  return (
    <nav className="menu">
      <ul className="menu__list">
        <li className="menu__item">
          <a className="menu__item-link" href="#about">
            <span> Обо мне </span>
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__item-link" href="#projects">
            <span className="menu__item-text"> Проекты </span>
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__item-link" href="#interests">
            <span className="menu__item-text"> Интересы </span>
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__item-link" href="#blog">
            <span className="menu__item-text"> Блог </span>
          </a>
        </li>
        <li className="menu__item">
          <details className="menu__details">
            <summary className="menu__details-summary">
              <span className="menu__details-summary-text">Контакты</span>
            </summary>
            <ul className="menu__details-list">
              <li className="menu__details-item">
                <a
                  className="menu__details-item-link"
                  href="https://vk.com/besfalin_yt"
                >
                  <span className="menu__details-item-text"> Профиль в ВК</span>
                </a>
              </li>
              <li className="menu__details-item">
                <a
                  className="menu__details-item-link"
                  href="youtube.com/@DanteBesfalin"
                >
                  <span className="menu__details-item-text">YouTube-канал</span>
                </a>
              </li>
              <li className="menu__details-item">
                <a className="menu__details-item-link" href="https://tg.com">
                  <span className="menu__details-item-text">
                    Телеграмм-канал
                  </span>
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
