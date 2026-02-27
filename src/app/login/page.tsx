"use client";

import { useActionState } from "react";
import { login, type ActionState } from "./actions";
import styles from "./login.module.css";

// フォームの初期状態
const initialState: ActionState = {
  message: "",
};

export default function Login() {
  /**
   * state: サーバーから返ってきたデータ（messageなど）
   * formAction: formのaction属性に渡す関数
   * pending: 送信中かどうか（true/false）
   */
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <>
      <div className={styles.login}>
        <h1 className={styles.title}>ログイン</h1>

        <form action={formAction} className={styles.loginForm}>
          {/* エラーメッセージがある場合のみ表示 */}
          {state.message && <p className={styles.error}>{state.message}</p>}

          <label className={styles.label}>メールアドレス</label>
          <input type="email" name="username" className={styles.input} placeholder="メールアドレスを入力" required />

          <label className={styles.label}>パスワード</label>
          <input type="password" name="password" className={styles.input} placeholder="パスワードを入力" required />

          <button
            type="submit"
            className={styles.button}
            disabled={pending} // 送信中はボタンを押せないようにする
          >
            {pending ? "ログイン中..." : "ログイン"}
          </button>

          <p className={styles.register}>
            アカウントをお持ちでない方は
            <span className={styles.registerLink}>新規登録</span>
          </p>
        </form>
      </div>
    </>
  );
}
