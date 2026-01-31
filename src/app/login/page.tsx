import LoginHeader from "@/component/login_header";
import styles from "./login.module.css";

export default function Login() {
  return (
    <>
      <LoginHeader />
      <div className={styles.login}>
        <h1 className={styles.title}>ログイン</h1>
        <form className={styles.loginForm}>
          <label className={styles.label}>メールアドレス</label>
          <input type="text" name="username" className={styles.input} placeholder="メールアドレスを入力" />
          <label className={styles.label}>パスワード</label>
          <input type="password" name="password" className={styles.input} placeholder="パスワードを入力" />
          <button type="submit" className={styles.button}>
            ログイン
          </button>
          <p className={styles.register}>
            アカウントをお持ちでない方は<span className={styles.registerLink}>新規登録</span>
          </p>
        </form>
      </div>
    </>
  );
}
