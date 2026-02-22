import styles from "./styles.module.css";
import Pagination from "@/component/Pagination";
import Card from "@/component/Card";
import { Database } from "@/types/supabase/type";

export default function myPage() {
  // ダミーデータ
  const cards = Array.from(
    { length: 8 },
    () => ({ id: Math.random() * 1000 }) as Database["public"]["Tables"]["posts"]["Row"],
  );

  return (
    <>
      <h1 className={styles.title}>Your Post</h1>

      <div className={styles.cardGrid}>
        {/* // ダミーデータを使用してカードを表示 */}
        {/* // ダミーデータのカードのIDをキーとして使用するため、map関数のインデックスは使用しない */}
        {cards.map((card) => (
          <Card key={card?.id} />
        ))}
      </div>

      {/* // ダミーデータの件数とPaginationの表示を一致させるため、postCountにcards.lengthを使用 */}
      <Pagination postCount={cards.length} />
    </>
  );
}
