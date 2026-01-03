/**
 * Преобразует имя файла в читаемое название
 * Например: "мой-первый-пост.md" -> "Мой первый пост"
 */
export function slugToTitle(slug) {
  const words = slug
    .replace(/\.md$/, "") // Убираем расширение
    .split("-"); // Разбиваем по дефисам

  // Капитализируем только первое слово, остальные в нижнем регистре
  return words
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word.toLowerCase()
    )
    .join(" "); // Соединяем пробелами
}

/**
 * Преобразует читаемое название в slug
 * Например: "Мой первый пост" -> "мой-первый-пост"
 */
export function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Убираем спецсимволы
    .trim()
    .replace(/\s+/g, "-"); // Заменяем пробелы на дефисы
}

// Список блогов - будет заполнен при первой загрузке
let cachedPosts = null;

/**
 * Получает список всех MD файлов из папки blog
 * Для работы нужно создать файл blog-list.json или использовать другой метод
 */
export async function getBlogPosts() {
  if (cachedPosts) {
    return cachedPosts;
  }

  try {
    // Пытаемся загрузить список из JSON файла
    const response = await fetch("/blog/blog-list.json");
    if (response.ok) {
      const data = await response.json();
      cachedPosts = data.posts
        .map((post) => ({
          slug: post.slug,
          title: post.title || slugToTitle(post.slug),
          path: `/blog/${post.slug}.md`,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        }))
        .sort((a, b) => b.title.localeCompare(a.title, "ru")); // Обратная сортировка - последний первый
      return cachedPosts;
    }
  } catch (error) {
    console.warn(
      "Не удалось загрузить blog-list.json, используем fallback:",
      error
    );
  }

  // Fallback: возвращаем пустой массив или можно попробовать другой метод
  return [];
}

/**
 * Получает содержимое конкретного блога по slug
 */
export async function getBlogPost(slug) {
  try {
    const response = await fetch(`/blog/${slug}.md`);
    if (response.ok) {
      return await response.text();
    }
    return null;
  } catch (error) {
    console.error(`Ошибка загрузки блога ${slug}:`, error);
    return null;
  }
}

/**
 * Получает информацию о посте по slug (включая даты)
 */
export async function getBlogPostInfo(slug) {
  try {
    const posts = await getBlogPosts();
    return posts.find((post) => post.slug === slug) || null;
  } catch (error) {
    console.error(`Ошибка получения информации о посте ${slug}:`, error);
    return null;
  }
}

/**
 * Форматирует дату для отображения
 */
export function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };

  return date.toLocaleDateString("ru-RU", options);
}

/**
 * Получает последний пост (первый в обратно отсортированном списке)
 */
export async function getLatestPost() {
  const posts = await getBlogPosts();
  if (posts.length > 0) {
    // Возвращаем первый пост (последний добавленный)
    return posts[0];
  }
  return null;
}
