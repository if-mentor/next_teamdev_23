"use server";

import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

/**
 * MEMO:
 * 現在はAPI実装のみのタスクのため、
 * エラーや成功時のメッセージは一時的にコンソールに出力しています。
 * 画面側へのフィードバック（バリデーションエラー表示など）は、
 * 今後のタスクで実装をお願いします。
 */

export async function signup(formData: FormData) {
  // 1. Supabaseクライアントの作成
  const supabase = await createClient();

  // 2. フォームから値を取得
  const name = formData.get("name") as string;
  //　空白を消去、大文字を小文字に統一
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  // 3. バリデーション（簡易チェック）
  if (!name || !email || !password) {
    console.error("入力内容が不足しています");
    return { error: 'すべての項目を入力してください' }
  }

  // 4. Supabase Authにサインアップ
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
      },
    },
  });

  if (authError) {
    console.error("認証エラー:", authError.message);
    return { error: authError.message }
  }

  // 5. usersテーブルへの登録
  // ※Auth登録成功、かつユーザーIDが発行されていたら実行
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
      return { error: 'ユーザー情報の保存に失敗しました' }
    }
  }

  // 登録完了後のリダイレクト
  redirect("/login");
}
