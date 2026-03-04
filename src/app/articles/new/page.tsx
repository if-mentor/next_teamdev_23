import ImagePreview from "@/component/ImagePreview";
import Select from "@/component/Select";
import Textarea from "@/component/Textarea";
import styles from "./page.module.css";

export default function ArticleNewPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}></h1>

      {/* タイトル */}
      <div className={styles.section}>
        <input type="text" placeholder="タイトルを入力" className={styles.input} />
      </div>

      {/* 画像 */}
      <div className={styles.section}>
        <ImagePreview />
      </div>

      {/* カテゴリ */}
      <div className={`${styles.section} ${styles.selectSection}`}>
        <Select label="カテゴリ" />
      </div>

      {/* 本文 */}
      <div className={styles.section}>
        <Textarea placeholder="本文を入力" />
      </div>

      {/* 投稿 */}
      <div className={styles.submitWrapper}>
        <button type="button" className={styles.submitButton}>
          投稿
        </button>
      </div>
    </main>
  );
}
