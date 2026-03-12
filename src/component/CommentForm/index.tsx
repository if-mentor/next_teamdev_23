"use client";

import { useActionState } from "react";
import { createComment, type CommentState } from "@/app/articles/[id]/actions";
import styles from "./index.module.css";

type Props = {
  postId: number;
};

const initialState: CommentState = {};

export default function CommentForm({ postId }: Props) {
  const [state, formAction, isPending] = useActionState(createComment, initialState);

  return (
    <form className={styles.commentForm} action={formAction}>
      <input type="hidden" name="post_id" value={postId} />
      {state?.error && <p className={styles.error}>{state.error}</p>}
      <textarea name="content" className={styles.input} placeholder="コメントを入力" required rows={3} />
      <button className={styles.commentFormButton} type="submit" disabled={isPending}>
        {isPending ? "送信中..." : "コメント"}
      </button>
    </form>
  );
}
