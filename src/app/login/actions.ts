"use server";

import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
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
    // 認証失敗時はエラーパラメータを付与してログイン画面へリダイレクト
    redirect("/login?error=auth-failed");
  }

  // 認証成功時はトップページへ
  redirect("/");
}
