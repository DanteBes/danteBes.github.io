import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogPosts, formatDate } from "../../utils/blogUtils";
import style from "./BlogList.module.css";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const blogPosts = await getBlogPosts();
        setPosts(blogPosts);
      } catch (error) {
        console.error("Ошибка загрузки блогов:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className={style.container}>
        <div className={style.content}>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <h1 className={style.title}>Блог</h1>
        {posts.length === 0 ? (
          <p className={style.empty}>Пока нет постов в блоге.</p>
        ) : (
          <ul className={style.list}>
            {posts.map((post) => (
              <li key={post.slug} className={style.item}>
                <Link to={`/blogs/${post.slug}`} className={style.link}>
                  <div className={style.linkContent}>
                    <h3 className={style.linkTitle}>{post.title}</h3>
                    <div className={style.linkMeta}>
                      {post.updatedAt && (
                        <span className={style.linkDate}>
                          {formatDate(post.updatedAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default BlogList;
