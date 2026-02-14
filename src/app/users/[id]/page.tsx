
import Header from "@/component/Header";
import styles from "./styles.module.css";
import Pagination from "@/component/Pagination";
import Card from "@/component/Card";

type CardProps = {
  className?: string;
}

export default function myPage() {

  const cards = Array.from({ length: 8 });

  return (
    <div>
      <Header />
      <h1 className={styles.title}>Your Post</h1>

        <div className={styles.cardGrid}>
          {cards.map((_, idx) => (
          <Card key={idx} />
        ))}
        </div>

      <Pagination />
    </div>
  );
}
