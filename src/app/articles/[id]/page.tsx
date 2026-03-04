import BlogCard from "@/component/BlogCard";
import CommentForm from "@/component/CommentForm";
import CommentCard from "@/component/CommentCard";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";

// ダミーコメントデータ
const dummyComments = [
  {
    id: 1,
    userName: "Dummy1",
    timeAgo: "1時間前",
    content: "朝食はパン派です！ライ麦パン食べたくなりました🍞",
    iconUrl: "https://placehold.jp/32x32.png", // 仮のアイコン
  },
  {
    id: 2,
    userName: "Dummy2",
    timeAgo: "2時間前",
    content: "初めて知りました。植物の生存戦略すごい。",
    iconUrl: "https://placehold.jp/32x32.png", // 仮のアイコン
  },
];

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // URLから記事IDを取得
  const { id } = await params;
  const supabase = await createClient();
  const numericId = Number(id);

  //isNaN()関数を使って、numericIdが有効な数値かどうかをチェック。無効な場合はnotFound()を返す。
  if (isNaN(numericId)) {
    notFound();
  }

  // numericId(URLから取得した記事ID)を使って、Supabaseから記事データを取得
  const { data: article } = await supabase
    .from("posts")
    .select(
      `
    title,
    content,
    image_path,
    users(
      image_path
      )
    `,
    )
    .eq("id", numericId)
    .maybeSingle();

  // 取得した記事データが存在すればそれを、存在しなければnotFound()を返す
  // テーブルデータにauthorIconUrlがなかったため、ここでは省略。BlogCardのpropsを削除するか、テーブルデータにauthorIconUrlを追加するか要確認。
  if (!article) {
    notFound();
  }

  return (
    <main className={styles.main}>
      {/* 1. 記事詳細エリア */}
      <section className={styles.section}>
        <BlogCard
          title={article.title}
          content={article.content}
          imageUrl={article.image_path}
          authorIconUrl={article.users.image_path}
        />
      </section>

      {/* 2. コメントエリア */}
      <section className={styles.section}>
        {/* 件数表示 */}
        <h2 className={styles.commentHeading}>{dummyComments.length}件のコメント</h2>

        {/* コメント投稿フォーム */}
        <div className={styles.formWrapper}>
          <CommentForm />
        </div>

        {/* コメント一覧 */}
        <div className={styles.commentList}>
          {dummyComments.map((comment) => (
            <CommentCard
              key={comment.id}
              username={comment.userName}
              timeAgo={comment.timeAgo}
              content={comment.content}
              // 将来CommentCardが対応したらiconUrlを渡す
              // iconUrl={comment.iconUrl}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
