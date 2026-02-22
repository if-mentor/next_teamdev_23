import styles from "./styles.module.css";

import SearchBar from "@/component/SearchBar";
import Card from "@/component/Card";
import Pagination from "@/component/Pagination";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.searchArea}>
          <SearchBar />
        </div>

        <section className={styles.grid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <Card
              key={index}
              title={`Post Title ${index + 1}`}
              category="Category"
              author="Author Name"
              timeAgo="3 min ago"
            />
          ))}
        </section>

        <div className={styles.paginationArea}>
          <Pagination />
        </div>
      </main>
    </>
  );
}
