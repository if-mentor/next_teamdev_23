import { notFound, redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import ImagePreview from "@/component/ImagePreview";
import styles from "./style.module.css";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const postId = Number(id);

  if (isNaN(postId)) notFound();

  const { data: post, error } = await supabase.from("posts").select("*").eq("id", postId).single();

  console.log("post:", post);
  console.log("error:", error);

  if (!post || error) notFound();

  const { data: categories } = await supabase.from("categories").select("*").order("id", { ascending: true });

  async function updatePost(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const categoryId = Number(formData.get("category_id"));
    const imagePath = formData.get("image_path") as string;

    const supabase = await createClient();

    await supabase
      .from("posts")
      .update({
        title,
        content,
        category_id: categoryId,
        image_path: imagePath,
        updated_at: new Date().toISOString(),
      })
      .eq("id", postId);

    redirect(`/articles/${postId}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <form action={updatePost} className={styles.form}>
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
