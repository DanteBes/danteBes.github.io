import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getBlogPost,
  getBlogPostInfo,
  formatDate,
} from "../../utils/blogUtils";
import style from "./BlogPost.module.css";

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const [postContent, info] = await Promise.all([
          getBlogPost(slug),
          getBlogPostInfo(slug),
        ]);

        if (postContent === null) {
          setError("Пост не найден");
        } else {
          setContent(postContent);
          setPostInfo(info);
        }
      } catch (err) {
        console.error("Ошибка загрузки поста:", err);
        setError("Ошибка загрузки поста");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className={style.container}>
        <div className={style.content}>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={style.container}>
        <div className={style.content}>
          <p className={style.error}>{error}</p>
          <button
            onClick={() => navigate("/blogs")}
            className={style.backButton}
          >
            ← Назад к списку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <button onClick={() => navigate("/blogs")} className={style.backButton}>
          ← Назад к списку
        </button>
        {postInfo && postInfo.updatedAt && (
          <div className={style.postMeta}>
            <span className={style.postDate}>
              {formatDate(postInfo.updatedAt)}
            </span>
          </div>
        )}
        <article className={style.article}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
        <div className={style.commentButton}>
          <a
            href="https://t.me/dantebesfalin"
            className={style.commentButtonLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Комментировать
            <span className={style.commentButtonIcon}>&gt;</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
