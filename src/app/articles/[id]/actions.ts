"use server";

import { createClient } from "@/libs/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CommentState = {
  error?: string;
};

export async function createComment(prevState: CommentState | null, formData: FormData): Promise<CommentState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "コメントするにはログインしてください" };
  }

  const postId = formData.get("post_id");
  const content = String(formData.get("content") ?? "").trim();

  const numericPostId = Number(postId);
  if (isNaN(numericPostId)) {
    return { error: "不正な記事IDです" };
  }

  if (!content) {
    return { error: "コメントを入力してください" };
  }

  const name = (user.user_metadata?.name as string) ?? user.email?.split("@")[0] ?? "ユーザー";
  await supabase.from("users").upsert([{ id: user.id, email: user.email ?? "", name }], { onConflict: "id" });

  const { error } = await supabase.from("comments").insert({
    post_id: numericPostId,
    user_id: user.id,
    content,
  });

  if (error) {
    console.log("comment insert error:", error);
    return { error: error.message };
  }

  revalidatePath(`/articles/${numericPostId}`);
  return {};
}

export type UpdatePostState = {
  error?: string;
};

export async function updatePost(prevState: UpdatePostState | null, formData: FormData): Promise<UpdatePostState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "ログインが必要です" };
  }

  const id = formData.get("id");
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  const numericId = Number(id);
  if (isNaN(numericId)) {
    return { error: "不正な記事IDです" };
  }

  if (!title) {
    return { error: "タイトルを入力してください" };
  }

  if (!content) {
    return { error: "本文を入力してください" };
  }

  const { error } = await supabase.from("posts").update({ title, content }).eq("id", numericId).eq("user_id", user.id);

  if (error) {
    console.log("post update error:", error);
    return { error: error.message };
  }

  revalidatePath(`/articles/${numericId}`);
  revalidatePath(`/articles/${numericId}/edit`);
  return {};
}

export type DeletePostState = {
  error?: string;
};

export async function deletePost(prevState: DeletePostState | null, formData: FormData): Promise<DeletePostState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "ログインが必要です" };
  }

  const id = formData.get("id");
  const numericId = Number(id);
  if (isNaN(numericId)) {
    return { error: "不正な記事IDです" };
  }

  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("id, user_id")
    .eq("id", numericId)
    .maybeSingle();

  if (fetchError) {
    console.log("deletePost fetch error:", fetchError);
    return { error: fetchError.message };
  }

  if (!post) {
    return { error: "記事が見つかりません" };
  }

  if (post.user_id !== user.id) {
    return { error: "この記事を削除する権限がありません" };
  }

  const { error: deleteError } = await supabase.from("posts").delete().eq("id", numericId).eq("user_id", user.id);

  if (deleteError) {
    console.log("deletePost delete error:", deleteError);
    return { error: deleteError.message };
  }

  revalidatePath("/");
  redirect("/");
}
