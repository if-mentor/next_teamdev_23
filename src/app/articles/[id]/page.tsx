import BlogCard from "@/component/BlogCard";
import CommentForm from "@/component/CommentForm";
import CommentCard from "@/component/CommentCard";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { formatTimeAgo } from "@/utils/date";

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // URLから記事IDを取得
  const { id } = await params;
  const supabase = await createClient();
  const numericId = Number(id);

  // numericIdが無効なら404
  if (isNaN(numericId)) {
    notFound();
  }

  // 記事データ取得
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

  // コメント取得
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
      {/* 記事詳細 */}
      <section className={styles.section}>
        <BlogCard
          title={article.title}
          content={article.content}
          imageUrl={article.image_path}
          authorIconUrl={article.users?.image_path || null}
        />
      </section>

      {/* コメントエリア */}
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
