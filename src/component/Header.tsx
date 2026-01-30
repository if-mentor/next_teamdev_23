"use client";

import { useState } from "react";

const Header = () => {
  // supabaseの認証状態をここで取得し、useStateにセットする想定

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <header
      style={{
        width: "100%",
        maxWidth: "1440px",
        height: "72px",
        margin: "0 auto",
        backgroundColor: "#d9d9d9",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 24px",
        gap: "12px",
        boxSizing: "border-box",
      }}
    >
      {/* 未認証 */}
      {!isAuthenticated && (
        <>
          <button
            style={{
              padding: "8px 16px",
              border: "1px solid #333333",
              borderRadius: "12px",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            ログイン
          </button>

          <button
            style={{
              padding: "8px 16px",
              border: "1px solid #333333",
              borderRadius: "12px",
              backgroundColor: "#333333",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            新規登録
          </button>
        </>
      )}

      {/* 認証済 */}
      {isAuthenticated && (
        <>
          <button
            style={{
              padding: "8px 16px",
              border: "1px solid #333333",
              borderRadius: "12px",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            新規作成
          </button>

          <button
            style={{
              padding: "8px 16px",
              border: "1px solid #333333",
              borderRadius: "12px",
              backgroundColor: "#333333",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            ログアウト
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
