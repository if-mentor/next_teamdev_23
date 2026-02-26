import styles from "./index.module.css";

type Props = {
  label?: string;
  placeholder?: string;
};

export default function Textarea(props: Props) {
  const id = "textarea";

  return (
    <div className={styles.wrapper}>
      {props.label && (
        <label htmlFor={id} className={styles.label}>
          {props.label}
        </label>
      )}

      <textarea
        id={id}
        className={styles.textarea}
        placeholder={props.placeholder}
      />
    </div>
  );
}