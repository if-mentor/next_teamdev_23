import { login } from "./actions";
import styles from "./login.module.css";

export default function Login() {
  return (
    <>
      <div className={styles.login}>
        <h1 className={styles.title}>ログイン</h1>
        {/* actionを追加 */}
        <form action={login} className={styles.loginForm}>
          <label className={styles.label}>メールアドレス</label>
          <input type="email" name="username" className={styles.input} placeholder="メールアドレスを入力" required />
          <label className={styles.label}>パスワード</label>
          <input type="password" name="password" className={styles.input} placeholder="パスワードを入力" required />
          <button type="submit" className={styles.button}>
            ログイン
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
