import BlogCard from "@/component/BlogCard";
import CommentForm from "@/component/CommentForm";
import CommentCard from "@/component/CommentCard";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  if (diffMin < 1) return "たった今";
  if (diffMin < 60) return `${diffMin}分前`;
  if (diffHour < 24) return `${diffHour}時間前`;
  if (diffDay < 7) return `${diffDay}日前`;
  return date.toLocaleDateString("ja-JP");
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

  if (!article) {
    notFound();
  }

  const { data: comments } = await supabase
    .from("comments")
    .select(
      `
      id,
      content,
      created_at,
      users(name)
    `,
    )
    .eq("post_id", numericId)
    .order("created_at", { ascending: true });

  const commentList = comments ?? [];

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
        <h2 className={styles.commentHeading}>{commentList.length}件のコメント</h2>

        <div className={styles.formWrapper}>
          <CommentForm key={commentList.length} postId={numericId} />
        </div>

        <div className={styles.commentList}>
          {commentList.map((comment) => (
            <CommentCard
              key={comment.id}
              username={(comment.users as { name: string } | null)?.name ?? "ユーザー"}
              timeAgo={formatTimeAgo(comment.created_at)}
              content={comment.content}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
