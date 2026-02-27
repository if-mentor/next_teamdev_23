"use server";

import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export interface SignupState {
  error: string;
}

export async function signup(prevState: SignupState, formData: FormData): Promise<SignupState> {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = formData.get("password") as string;

  // 1. 空欄チェック
  if (!name || !email || !password) {
    return { error: "すべての項目を入力してください" };
  }

  // 2. パスワードの文字数チェック（8文字以上か判定）
  if (password.length < 8) {
    return { error: "パスワードは8文字以上で入力してください" };
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
      },
    },
  });

  // 3. Supabaseからのエラーを日本語に翻訳
  if (authError) {
    console.error("認証エラー:", authError.message);

    // エラーメッセージの翻訳
    let errorMessage = "登録に失敗しました。もう一度お試しください。";
    if (authError.message.includes("User already registered")) {
      errorMessage = "このメールアドレスはすでに登録されています";
    } else if (authError.message.includes("Invalid email")) {
      errorMessage = "有効なメールアドレスを入力してください";
    }

    return { error: errorMessage };
  }

  if (authData.user) {
    const { error: dbError } = await supabase.from("users").insert([
      {
        id: authData.user.id,
        name: name,
        email: email,
      },
    ]);

    if (dbError) {
      console.error("DB登録エラー:", dbError.message);
      return { error: "ユーザー情報の保存に失敗しました" };
    }
  }

  redirect("/login");
}
