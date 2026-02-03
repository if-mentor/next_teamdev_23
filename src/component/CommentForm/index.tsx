"use client";

import styles from "./index.module.css";
import { useState } from "react";

function CommentForm() {
  const [comment, setComment] = useState("");

  // コメントボタンを押した時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルトの送信動作を防ぐ
    if (!comment.trim()) return; // trimを適用した上で、コメントが空の場合は送信しない
    console.log("コメント送信:", comment);
    setComment("");
  };

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit}>
      <textarea
        className={styles.input}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="コメントを入力"
      />
      <button className={styles.commentFormButton} type="submit">
        コメント
      </button>
    </form>
  );
}

export default CommentForm;
