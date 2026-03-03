"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";

type SelectProps = {
  label?: string;
  options?: string[];
};

export default function Select({
  label = "カテゴリ",
  options = ["カテゴリ1", "カテゴリ2", "カテゴリ3"],
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayText = selectedValue || "カテゴリ選択";

  return (
    <div className={styles.container} ref={containerRef}>
      <label className={styles.label}>
        {label}
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={selectedValue ? styles.triggerTextSelected : styles.triggerText}>
            {displayText}
          </span>
          <span className={styles.arrow} aria-hidden>{isOpen ? "▲" : "▼"}</span>
        </button>
      </label>

      {isOpen && (
        <ul
          className={styles.optionsPanel}
          role="listbox"
          aria-label={label}
        >
          <li
            role="option"
            className={`${styles.option} ${selectedValue === "" ? styles.optionSelected : ""}`}
            onMouseDown={() => {
              setSelectedValue("");
              setIsOpen(false);
            }}
          >
            カテゴリ選択
          </li>
          {options.map((option) => (
            <li
              key={option}
              role="option"
              className={`${styles.option} ${selectedValue === option ? styles.optionSelected : ""}`}
              onMouseDown={() => {
                setSelectedValue(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
