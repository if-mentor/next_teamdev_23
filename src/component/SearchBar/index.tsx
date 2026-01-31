import styles from "./index.module.css";

const SearchBar = () => {
  return (
    <div className={styles.container}>
      <input type="text" className={styles.input} placeholder="検索したい記事を入力してください" />
      <button className={styles.button}>検索</button>
    </div>
  );
};

export default SearchBar;
