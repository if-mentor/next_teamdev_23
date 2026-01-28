import styles from '@/component/login_header.module.css';

function LoginHeader() {
  return (
    <header className={styles.loginHeader}>
      <ul>
        <button className={styles.loginButton}>ログイン</button>
        <button className={styles.signUpButton}>新規登録</button>
      </ul>

    </header>
  );
}

export default LoginHeader;