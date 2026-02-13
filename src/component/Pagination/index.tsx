"use client";

import { useState } from "react";
import styles from "./Pagination.module.css";

export default function Pagination() {
  const totalPages = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 前のページへ：1ページ目より大きい時だけ実行
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 次のページへ：最大ページより小さい時だけ実行
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <nav className={styles.container}>
      <button className={styles.navButton} onClick={handlePrevious}>
        <span className={styles.arrow}>←</span> Previous Page
      </button>

      <ul className={styles.pageList}>
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={`${styles.pageButton} ${page === currentPage ? styles.active : ""}`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button className={styles.navButton} onClick={handleNext}>
        Next Page <span className={styles.arrow}>→</span>
      </button>
    </nav>
  );
}
