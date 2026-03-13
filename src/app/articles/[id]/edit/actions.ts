"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";

export async function updatePost(postId: number, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const categoryId = Number(formData.get("category_id"));
  const imageFile = formData.get("image") as File;

  const redirectWithError = (message: string) => {
    redirect(`/articles/${postId}/edit?error=${encodeURIComponent(message)}`);
  };

  if (!title?.trim()) redirectWithError("タイトルを入力してください");
  if (!content?.trim()) redirectWithError("本文を入力してください");
  if (!categoryId) redirectWithError("カテゴリを選択してください");

  const supabase = await createClient();

  let publicUrl = "";

  // 画像アップロード処理
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `blog_image/${fileName}`;

    const { error: uploadError } = await supabase.storage.from("teamdev").upload(filePath, imageFile);

    if (uploadError) redirectWithError("画像アップロードに失敗しました");

    const { data } = supabase.storage.from("teamdev").getPublicUrl(filePath);

    publicUrl = data.publicUrl;
  }

  const { error: updateError } = await supabase
    .from("posts")
    .update({
      title,
      content,
      category_id: categoryId,
      image_path: publicUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", postId);

  if (updateError) redirectWithError("記事の更新に失敗しました");

  redirect(`/articles/${postId}`);
}

export async function deletePost(postId: number) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/articles/${postId}/edit?error=${encodeURIComponent("ログインが必要です")}`);
  }

  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("id, user_id")
    .eq("id", postId)
    .maybeSingle();

  if (fetchError) {
    redirect(`/articles/${postId}/edit?error=${encodeURIComponent("記事の取得に失敗しました")}`);
  }

  if (!post) {
    redirect(`/articles/${postId}/edit?error=${encodeURIComponent("記事が見つかりません")}`);
  }

  if (post.user_id !== user.id) {
    redirect(`/articles/${postId}/edit?error=${encodeURIComponent("この記事を削除する権限がありません")}`);
  }

  const { error: deleteError } = await supabase.from("posts").delete().eq("id", postId).eq("user_id", user.id);

  if (deleteError) {
    redirect(`/articles/${postId}/edit?error=${encodeURIComponent("記事の削除に失敗しました")}`);
  }

  redirect("/");
}
