type Props = {
    label?: string;
    options?: string[];
  };
  
  export default function Select({
    label = "カテゴリ",
    options = ["カテゴリ1", "カテゴリ2", "カテゴリ3"],
  }: Props) {
    return (
      <>
        {/* ラベル＋セレクト全体 */}
        <div style={{ width: 240, height: 57 }}>
          {/* カテゴリラベル */}
          <div style={{ fontSize: 14, lineHeight: "17px", marginBottom: 4 }}>
            {label}
          </div>
  
          {/* select本体 */}
          <select
            defaultValue=""
            style={{
              width: "100%",
              height: 40,
              border: "1px solid #ccc",
              borderRadius: 6,
              padding: "0 8px",
              background: "#fff",
            }}
          >
            {/* カテゴリ選択 */}
            <option value="" disabled>
              カテゴリ選択
            </option>
  
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
  