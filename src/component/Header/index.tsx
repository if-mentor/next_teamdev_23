"use client";

import { useState } from "react";
import styles from "./index.module.css";

const Header = () => {
  // supabaseの認証状態をここで取得し、useStateにセットする想定
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <header className={styles.header}>
      {!isAuthenticated ? (
        <>
          <button className={styles.button}>ログイン</button>
          <button className={`${styles.button} ${styles.buttonPrimary}`}>新規登録</button>
        </>
      ) : (
        <>
          <button className={styles.button}>新規作成</button>
          <button className={`${styles.button} ${styles.buttonPrimary}`}>ログアウト</button>
        </>
      )}
    </header>
  );
};

export default Header;
