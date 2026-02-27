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

  // 認証成功時はトップページへ
  redirect("/");
}
