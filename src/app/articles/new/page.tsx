import { createArticle } from "./actions";
import { createClient } from "@/libs/supabase/server";
import ImagePreview from "@/component/ImagePreview";
import Select from "@/component/Select";
import Textarea from "@/component/Textarea";
import styles from "./page.module.css";

export default async function ArticleNewPage() {
  const supabase = await createClient();
  
  // categoriesテーブルから一覧を取得
  const { data: categories } = await supabase.from("categories").select("id, name");

  // Selectコンポーネントに渡す形式に整形
  const options = categories?.map((c) => c.name) || [];

  return (
    <main className={styles.main}>
      <form action={createArticle}>
        <h1 className={styles.title}>投稿作成</h1>

        {/* タイトル */}
        <div className={styles.section}>
          <input 
            name="title" 
            type="text" 
            placeholder="タイトルを入力" 
            className={styles.input} 
            required 
          />
        </div>

        {/* 画像 */}
        <div className={styles.section}>
          <ImagePreview />
        </div>

        {/* カテゴリ */}
        <div className={`${styles.section} ${styles.selectSection}`}>
          <Select name="category_id" label="カテゴリ" options={options} />
        </div>

        {/* 本文 */}
        <div className={styles.section}>
          <Textarea name="content" placeholder="本文を入力" />
        </div>

        {/* 投稿 */}
        <div className={styles.submitWrapper}>
          <button type="submit" className={styles.submitButton}>
            投稿
          </button>
        </div>
      </form>
    </main>
  );
}

