import Link from "next/link";
import styles from "./signup.module.css";

export default function Signup() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>新規登録</h1>
      <form className={styles.form}>
        {/* 名前入力エリア */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="name">
            名前
          </label>
          <input type="text" id="name" name="name" className={styles.input} placeholder="名前を入力" />
        </div>

        {/* メールアドレス入力エリア */}
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">
            メールアドレス
          </label>
          <input type="email" id="email" name="email" className={styles.input} placeholder="メールアドレスを入力" />
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
            placeholder="パスワードを入力"
          />
        </div>

        {/* 登録ボタン */}
        <button type="submit" className={styles.button}>
          登録する
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
