"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Pagination.module.css";

type PaginationProps = {
  postCount: number;
  perPage?: number;
};

export default function Pagination({ postCount, perPage = 8 }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(postCount / perPage);

  const currentPage = Number(searchParams.get("page") ?? "1");

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // totalPages が 0 のときは何も表示しない
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={styles.container}>
      <button className={styles.navButton} onClick={handlePrevious} disabled={currentPage === 1}>
        <span className={styles.arrow}>←</span> Previous Page
      </button>

      <ul className={styles.pageList}>
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              className={`${styles.pageButton} ${page === currentPage ? styles.active : ""}`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>

      <button className={styles.navButton} onClick={handleNext} disabled={currentPage === totalPages}>
        Next Page <span className={styles.arrow}>→</span>
      </button>
    </nav>
  );
}
