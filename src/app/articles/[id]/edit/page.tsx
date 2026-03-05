import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import ImagePreview from "@/component/ImagePreview";
import styles from "./style.module.css";
import { updatePost } from "./actions";

export default async function EditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: { error?: string };
}) {
  const { id } = await params;
  const errorMessage = searchParams?.error;

  const supabase = await createClient();
  const postId = Number(id);

  if (isNaN(postId)) notFound();

  const { data: post, error: postError } = await supabase.from("posts").select("*").eq("id", postId).single();

  if (!post || postError) notFound();

  const { data: categories } = await supabase.from("categories").select("*").order("id", { ascending: true });

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <form action={updatePost.bind(null, postId)} className={styles.form}>
          {errorMessage && <p style={{ color: "red", fontSize: "14px" }}>{decodeURIComponent(errorMessage)}</p>}

          {/* タイトル */}
          <input
            type="text"
            name="title"
            defaultValue={post.title}
            className={styles.titleInput}
            placeholder="タイトルを入力"
          />

          {/* 画像アップロードUI */}
          <ImagePreview />

          {/* 既存image_path保持 */}
          <input type="hidden" name="image_path" defaultValue={post.image_path ?? ""} />

          {/* カテゴリ */}
          <div className={styles.categoryWrapper}>
            <label className={styles.label}>カテゴリ</label>
            <select name="category_id" defaultValue={post.category_id} className={styles.select}>
              <option value="">カテゴリ選択</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* 本文 */}
          <textarea name="content" defaultValue={post.content} className={styles.textarea} rows={8} />

          {/* 送信ボタン */}
          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.submitButton}>
              投稿
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
