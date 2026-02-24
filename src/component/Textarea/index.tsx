import styles from "./index.module.css";

type Props = {
  label?: string;
  placeholder?: string;
};

export default function Textarea(props: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{props.label}</div>

      <textarea className={styles.textarea} placeholder={props.placeholder} />
    </div>
  );
}
