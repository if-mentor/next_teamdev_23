"use client";

type DeleteButtonProps = {
  formAction: () => void;
  className?: string;
};

export default function DeleteButton({ formAction, className }: DeleteButtonProps) {
  return (
    <button
      type="submit"
      formAction={formAction}
      className={className}
      onClick={(e) => {
        if (!confirm("本当に削除しますか？")) {
          e.preventDefault();
        }
      }}
    >
      削除
    </button>
  );
}
