"use client";

import Link from "next/link";
import styles from "./signup.module.css";
import { signup } from "./actions";
import { useActionState } from "react";

export default function Signup() {
  const [state, formAction, isPending] = useActionState(signup, { error: "" });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>新規登録</h1>

      <form className={styles.form} action={formAction}>
        {/* エラーメッセージを表示するエリア */}
        {state?.error && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "16px", textAlign: "center" }}>{state.error}</p>
        )}

        {/* 名前入力エリア */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="name">
            名前
          </label>
          <input type="text" id="name" name="name" className={styles.input} placeholder="名前を入力" required />
        </div>

        {/* メールアドレス入力エリア */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            placeholder="メールアドレスを入力"
            required
          />
        </div>

        {/* パスワード入力エリア */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="password">
            パスワード
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            placeholder="パスワードを入力（8文字以上）"
            required
            minLength={8}
          />
        </div>

        {/* 登録ボタン */}
        {/* isPending（処理中）の時はボタンを押せなくする */}
        <button type="submit" className={styles.button} disabled={isPending}>
          {isPending ? "登録しています..." : "登録する"}
        </button>

        {/* ログインのリンク */}
        <p className={styles.linkText}>
          すでにアカウントをお持ちの方は
          <Link href="/login" className={styles.link}>
            ログイン
          </Link>
        </p>
      </form>
    </div>
  );
}
