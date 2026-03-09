"use server";

import { createClient } from "@/libs/supabase/server";
import { revalidatePath } from "next/cache";

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
