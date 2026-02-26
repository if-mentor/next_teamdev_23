import styles from "./index.module.css";

type Props = {
  label?: string;
  placeholder?: string;
};

export default function Textarea(props: Props) {
  return (
    <div className={styles.wrapper}>
      {props.label && (
        <label htmlFor="content" className={styles.label}>
          {props.label}
        </label>
      )}

      <textarea
        id="content"
        className={styles.textarea}
        placeholder={props.placeholder}
      />
    </div>
  );
}