"use server";

import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export type ActionState = {
  message: string;
};

export async function login(prevState: ActionState | null, formData: FormData) {
  const supabase = await createClient();

  // フォームから入力値を取得
  const email = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Supabase Authを使用してサインイン
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.code === "invalid_credentials") {
      return { message: "メールアドレスとパスワードをご確認ください。" };
    } else {
      return { message: "予期しないエラーが発生しました" };
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const name = (user.user_metadata?.name as string) ?? user.email?.split("@")[0] ?? "ユーザー";
    await supabase.from("users").upsert([{ id: user.id, email: user.email ?? "", name }], { onConflict: "id" });
  }

  redirect("/");
}
