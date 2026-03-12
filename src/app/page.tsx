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

  const { page, q } = await searchParams;

  const parsedPage = Number(page);
  const currentPage = isNaN(parsedPage) ? 1 : Math.max(1, parsedPage);

  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("posts")
    .select(
      `
      *,
      users ( name ),
      categories ( name )
    `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false });

  // 検索キーワード(q)があれば、titleに部分一致する条件を追加
  if (typeof q === "string" && q.trim() !== "") {
    query = query.ilike("title", `%${q.trim()}%`);
  }

  const { data: posts, error, count } = await query.range(from, to);

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
        {/* 検索結果が0件だった時のメッセージを追加 */}
        {posts?.length === 0 && (
          <div style={{ textAlign: "center", width: "100%", gridColumn: "1 / -1", padding: "2rem" }}>
            該当する記事が見つかりませんでした。
          </div>
        )}
      </section>

      <div className={styles.paginationArea}>
        <Pagination postCount={totalCount} perPage={PAGE_SIZE} />
      </div>
    </main>
  );
}
