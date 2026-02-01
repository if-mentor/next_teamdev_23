import styles from "./style.module.css";
import type { CommentCardProps } from "./type";


const CommentCard = ({ username, timeAgo, content }: CommentCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>👤</div>
      <div>
        <div className={styles.header}>
          <span className={styles.username}>{username}</span>
          <span className={styles.time}>{timeAgo}</span>
        </div>
        <p className={styles.content}>{content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
