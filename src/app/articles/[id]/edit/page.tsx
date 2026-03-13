import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import ImagePreview from "@/component/ImagePreview";
import styles from "./style.module.css";
import { updatePost, deletePost } from "./actions";
import DeleteButton from "./DeleteButton";

export default async function EditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error: errorMessage } = await searchParams;

  const supabase = await createClient();
  const postId = Number(id);

  if (isNaN(postId)) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) notFound();

  const { data: post, error: postError } = await supabase.from("posts").select("*").eq("id", postId).single();

  if (!post || postError) notFound();

  const { data: categories } = await supabase.from("categories").select("*").order("id", { ascending: true });

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <form action={updatePost.bind(null, postId)} className={styles.form}>
          <input type="hidden" name="id" value={postId} />

          {errorMessage && <p style={{ color: "red", fontSize: "14px" }}>{decodeURIComponent(errorMessage)}</p>}

          <input
            type="text"
            name="title"
            defaultValue={post.title}
            className={styles.titleInput}
            placeholder="タイトルを入力"
          />

          <ImagePreview />

          <input type="hidden" name="image_path" defaultValue={post.image_path ?? ""} />

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

          <textarea name="content" defaultValue={post.content} className={styles.textarea} rows={8} />

          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.submitButton}>
              更新
            </button>

            <DeleteButton formAction={deletePost.bind(null, postId)} className={styles.deleteButton} />
          </div>
        </form>
      </div>
    </div>
  );
}
