"use client";

import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/libs/supabase/client";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  // 今のURLのパスを取得する
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      // セッション（ログイン状態）を取得
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    // 画面が開いた時や、URLが変わった時にチェックを実行
    checkUser();

    // リアルタイム監視もセット
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
    // pathname（URL）が変わるたびにこのuseEffectを再実行させる
  }, [supabase.auth, pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className={styles.header}>
      {!isAuthenticated ? (
        <>
          <Link href="/login" className={styles.button}>
            ログイン
          </Link>
          <Link href="/signup" className={`${styles.button} ${styles.buttonPrimary}`}>
            新規登録
          </Link>
        </>
      ) : (
        <>
          <Link href="/articles/new" className={styles.button}>
            新規作成
          </Link>
          <button onClick={handleLogout} className={`${styles.button} ${styles.buttonPrimary}`}>
            ログアウト
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
