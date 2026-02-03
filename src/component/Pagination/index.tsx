import styles from "./Pagination.module.css";

export default function Pagination() {
  // 今回は表示確認用なので、一旦固定の数字で作成します
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <nav className={styles.container}>
      <button className={styles.navButton}>
        <span className={styles.arrow}>←</span> Previous Page
      </button>

      <ul className={styles.pageList}>
        {pages.map((page) => (
          <li key={page}>
            <button className={`${styles.pageButton} ${page === 1 ? styles.active : ""}`}>{page}</button>
          </li>
        ))}
      </ul>

      <button className={styles.navButton}>
        Next Page <span className={styles.arrow}>→</span>
      </button>
    </nav>
  );
}
