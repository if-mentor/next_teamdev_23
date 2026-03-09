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

  const { data: comments, error } = await supabase
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

  if (error) {
    throw new Error("コメントの取得に失敗しました");
  }

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
