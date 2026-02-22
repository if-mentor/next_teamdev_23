import styles from "./styles.module.css";

import SearchBar from "@/component/SearchBar";
import Card from "@/component/Card";
import Pagination from "@/component/Pagination";

import { createClient } from "@/libs/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return <div>データの取得に失敗しました</div>;
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.searchArea}>
          <SearchBar />
        </div>

        <section className={styles.grid}>
          {posts?.map((post) => (
            <Card
              key={post.id}
              title={post.title}
              category="Category" 
              author="Author Name"
              timeAgo={new Date(post.created_at).toLocaleString()}
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
