"use client";

import { useRef } from "react";
import { useActionState } from "react";
import { deletePost } from "../actions";

type Props = {
  id: number;
  title: string;
  content: string;
};

export default function EditForm({ id, title, content }: Props) {
  const deleteFormRef = useRef<HTMLFormElement>(null);

  const [deleteState, deleteFormAction, isDeletePending] = useActionState(deletePost, {} as { error?: string });

  const handleDelete = () => {
    if (confirm("この記事を削除しますか？")) {
      deleteFormRef.current?.requestSubmit();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        maxWidth: 720,
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 14, fontWeight: 600 }}>タイトル</label>
        <input
          type="text"
          value={title}
          readOnly
          style={{
            padding: "12px 16px",
            fontSize: 16,
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 14, fontWeight: 600 }}>本文</label>
        <textarea
          value={content}
          readOnly
          style={{
            padding: "12px 16px",
            fontSize: 16,
            border: "1px solid #ddd",
            borderRadius: 8,
            minHeight: 200,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 12,
          marginTop: 24,
        }}
      >
        <button
          type="button"
          style={{
            width: 120,
            height: 40,
            fontSize: 15,
            fontWeight: 500,
            color: "#fff",
            backgroundColor: "#2f80ed",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          更新
        </button>

        <form ref={deleteFormRef} action={deleteFormAction}>
          <input type="hidden" name="id" value={id} />

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeletePending}
            style={{
              width: 120,
              height: 40,
              fontSize: 15,
              fontWeight: 500,
              color: "#fff",
              backgroundColor: "#ff3b30",
              border: "none",
              borderRadius: 8,
              cursor: isDeletePending ? "not-allowed" : "pointer",
              opacity: isDeletePending ? 0.6 : 1,
            }}
          >
            削除
          </button>
        </form>
      </div>

      {deleteState?.error && <p style={{ color: "#c00", fontSize: 14 }}>{deleteState.error}</p>}
    </div>
  );
}
