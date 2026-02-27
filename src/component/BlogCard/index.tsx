import styles from "./index.module.css";

type Props = {
  title: string;
  imageUrl?: string;
  content: string;
  authorIconUrl?: string;
};

const BlogCard = ({ title, imageUrl, content, authorIconUrl }: Props) => {
  return (
    <article className={styles.container}>
      {/* ヘッダー部分：タイトルとアイコン */}
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.authorIcon}>
          {authorIconUrl ? (
            // Imageタグを使うべきだが、next.config.jsの設定回避のため一時的にimgタグを使用
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={authorIconUrl} alt="Author" className={styles.iconImage} />
          ) : (
            <span className={styles.defaultIcon}>👤</span>
          )}
        </div>
      </div>

      {/* 画像エリア */}
      <div className={styles.imageArea}>
        {imageUrl ? (
          // Imageタグを使うべきだが、next.config.jsの設定回避のため一時的にimgタグを使用
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={imageUrl} alt={title} className={styles.image} />
        ) : (
          <div className={styles.noImage}></div>
        )}
      </div>

      {/* 本文エリア */}
      <div className={styles.content}>
        <p className={styles.text}>{content}</p>
      </div>
    </article>
  );
};

export default BlogCard;
