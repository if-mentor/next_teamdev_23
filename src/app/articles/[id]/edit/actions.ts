"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";

export async function updatePost(postId: number, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const categoryId = Number(formData.get("category_id"));
  const imagePath = formData.get("image_path") as string;

  const redirectWithError = (message: string) => {
    redirect(`/articles/${postId}/edit?error=${encodeURIComponent(message)}`);
  };

  if (!title?.trim()) {
    redirectWithError("タイトルを入力してください");
  }

  if (!content?.trim()) {
    redirectWithError("本文を入力してください");
  }

  if (!imagePath?.trim()) {
    redirectWithError("画像を入力してください");
  }

  if (!categoryId) {
    redirectWithError("カテゴリを選択してください");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirectWithError("ログインが必要です");
    return;
  }

  const { data: post, error: postError } = await supabase.from("posts").select("user_id").eq("id", postId).single();

  if (!post || postError) {
    redirectWithError("記事が見つかりません");
    return;
  }

  // 記事作成者本人のみ更新可能
  if (post.user_id !== user.id) {
    redirectWithError("この記事を更新する権限がありません");
    return;
  }

  const { error: updateError } = await supabase
    .from("posts")
    .update({
      title,
      content,
      category_id: categoryId,
      image_path: imagePath,
      updated_at: new Date().toISOString(),
    })
    .eq("id", postId);

  if (updateError) {
    redirectWithError("記事の更新に失敗しました");
  }

  redirect(`/articles/${postId}`);
}
