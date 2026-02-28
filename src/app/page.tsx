import styles from "./styles.module.css";
import SearchBar from "@/component/SearchBar";
import Card from "@/component/Card";
import Pagination from "@/component/Pagination";
import { createClient } from "@/libs/supabase/server";

const PAGE_SIZE = 8;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();

  const { page } = await searchParams;

  const parsedPage = Number(page);
  const currentPage = isNaN(parsedPage) ? 1 : Math.max(1, parsedPage);

  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const {
    data: posts,
    error,
    count,
  } = await supabase
    .from("posts")
    .select(
      `
      *,
      users ( name ),
      categories ( name )
    `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return <div>データの取得に失敗しました</div>;
  }

  const totalCount = count ?? 0;

  return (
    <main className={styles.main}>
      <div className={styles.searchArea}>
        <SearchBar />
      </div>

      <section className={styles.grid}>
        {posts?.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            category={post.categories?.name ?? ""}
            author={post.users?.name ?? ""}
            timeAgo={new Date(post.created_at).toLocaleString("ja-JP")}
          />
        ))}
      </section>

      <div className={styles.paginationArea}>
        <Pagination postCount={totalCount} perPage={PAGE_SIZE} />
      </div>
    </main>
  );
}
