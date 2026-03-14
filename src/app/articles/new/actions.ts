"use server";

import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export async function createArticle(formData: FormData) {
  const supabase = await createClient();

  // 1. ユーザー認証: ログイン中か確認し、未ログインなら処理を中断
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("投稿するにはログインが必要です");
  }

  // 2. データ抽出: 送信されたフォームデータから各項目を取り出し
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("image");
  const categoryId = formData.get("category_id") as string;

  let imageUrl = "";

  // 3. 画像アップロード: ファイルがあればStorageに保存し、公開URLを取得
  if (imageFile instanceof File && imageFile.size > 0) {
    const fileName = `blog_image/${Date.now()}_${imageFile.name}`;
    
    const { error: storageError } = await supabase.storage
      .from("teamdev")
      .upload(fileName, imageFile);

    if (storageError) {
      throw new Error(`画像のアップロードに失敗しました: ${storageError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from("teamdev")
      .getPublicUrl(fileName);
      
    imageUrl = publicUrlData.publicUrl;
  }

  // 4. DB保存: 画像URLを含む記事データをpostsテーブルへ挿入
  const { error: dbError } = await supabase.from("posts").insert({
    title,
    content,
    image_path: imageUrl, // アップロードした画像のURLを保存
    category_id: Number(categoryId) || 1,
    user_id: user.id,
  });

  if (dbError) {
    throw new Error(`データベースへの保存に失敗しました: ${dbError.message}`);
  }

  // 5. リダイレクト: 保存成功後にトップページへ移動
  redirect("/");
}