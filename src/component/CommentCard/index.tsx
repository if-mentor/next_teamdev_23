import Image from "next/image";
import styles from "./style.module.css";
import type { CommentCardProps } from "./type";

const defaultIconUrl = "/default-icon.png"; // デフォルトのアイコンURL

const CommentCard = ({ username, timeAgo, content, iconUrl }: CommentCardProps) => {
  return (
    <div className={styles.card}>
      {/* Next.jsのImageコンポーネントを使用して、アイコンURLが存在する場合は画像を表示し、存在しない場合はデフォルトのアイコン（👤）を表示  */}
      {/* Next.jsのImageコンポーネントはwidthとheightを指定する必要がある */}
      {/* Next.jsは初期状態で、外部画像を読み込んでリサイズなどの最適化を行う場合、next.config.jsでドメインを許可する必要があるためnext.config.jsを更新 */}
      <div className={styles.icon}>
        <Image src={iconUrl || defaultIconUrl} alt={`${username}のアイコン`} width={24} height={24} />
      </div>
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
