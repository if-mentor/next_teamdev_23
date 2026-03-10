"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./index.module.css";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 今のURLに検索キーワード(q)があれば初期値としてセットする
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  // 検索を実行する関数
  const handleSearch = () => {
    // 今のURLパラメーターを取得
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("q", query.trim()); // キーワードがあればセット
    } else {
      params.delete("q"); // 空欄なら削除
    }

    // 検索したら1ページ目に戻したいのでpageパラメーターは消す
    params.delete("page");

    // 新しいURLに遷移
    router.push(`/?${params.toString()}`);
  };

  // Enterキーを押した時にも検索が走るようにする
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        placeholder="検索したい記事を入力してください"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.button} onClick={handleSearch}>
        検索
      </button>
    </div>
  );
};

export default SearchBar;
