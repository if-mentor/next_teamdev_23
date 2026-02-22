import styles from "./styles.module.css";

type SelectProps = {
  label?: string;
  options?: string[];
};

export default function Select({ label = "カテゴリ", options = ["カテゴリ1", "カテゴリ2", "カテゴリ3"] }: SelectProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}
        <select defaultValue="" className={styles.select}>
          <option value="" disabled>
            カテゴリ選択
          </option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
