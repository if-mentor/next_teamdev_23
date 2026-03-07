import BlogCard from "@/component/BlogCard";
import CommentForm from "@/component/CommentForm";
import CommentCard from "@/component/CommentCard";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";

// 記事の投稿日から現在までの経過時間で表示する　例：5分前、2時間前、3日前など
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${Math.max(0, diffInSeconds)}秒前`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}分前`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}時間前`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}日前`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}ヶ月前`;
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}年前`;
}

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
  if (!article) {
    notFound();
  }

  const { data: commentsData } = await supabase
    .from("comments")
    .select(
      `
      id,
      user_id,
      post_id,
      content,
      created_at,
      users(
        name,
        image_path
      )
    `,
    )
    .eq("post_id", numericId)
    .order("created_at", { ascending: false }); // コメントを新しい順に並べる

  // commentsDataがnullの場合はから配列([])をセットする
  const comments = commentsData ?? [];

  return (
    <main className={styles.main}>
      {/* 1. 記事詳細エリア */}
      <section className={styles.section}>
        <BlogCard
          title={article.title}
          content={article.content}
          imageUrl={article.image_path}
          authorIconUrl={article.users?.image_path || null} // アイコンURLが存在しない場合はnullを渡す
        />
      </section>

      {/* 2. コメントエリア */}
      <section className={styles.section}>
        {/* 件数表示 */}
        <h2 className={styles.commentHeading}>{comments.length}件のコメント</h2>

        {/* コメント投稿フォーム */}
        <div className={styles.formWrapper}>
          <CommentForm />
        </div>

        {/* コメント一覧 */}
        <div className={styles.commentList}>
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              username={comment.users?.name || "名無しユーザー"} // ユーザー名が存在しない場合は「名無しユーザー」を表示
              timeAgo={formatTimeAgo(comment.created_at)}
              content={comment.content}
              iconUrl={comment.users?.image_path || null} // アイコンURLが存在しない場合はnullを渡す
            />
          ))}
        </div>
      </section>
    </main>
  );
}
