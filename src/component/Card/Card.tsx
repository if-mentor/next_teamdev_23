import styles from './Card.module.css';

interface CardProps {
  title?: string;
  category?: string;
  author?: string;
  timeAgo?: string;
}

const Card = ({ 
  title = "Post Title", 
  category = "Category", 
  author = "Author Name", 
  timeAgo = "3 min ago" 
}: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imagePlaceholder}>
        {/* 実際はここに<img>タグが入る */}
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.category}>{category}</span>
        </div>
        <p className={styles.author}>{author}</p>
        
        <div className={styles.description}>
          <div className={styles.line} style={{ width: '100%' }}></div>
          <div className={styles.line} style={{ width: '80%' }}></div>
        </div>

        <div className={styles.footer}>
          <span>{timeAgo}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;