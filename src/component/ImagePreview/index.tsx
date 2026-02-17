"use client";

import { useState, useCallback } from "react";
import styles from "./style.module.css";
import Image from "next/image";


const ImagePreview = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.uploadArea} ${isDragging ? styles.dragging : ""
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="preview"
            fill
            className={styles.previewImage}
            style={{ objectFit: "cover" }}
          />
        ) : (

          <>
            <div className={styles.arrow}>↑</div>
            <label className={styles.uploadButton}>
              画像アップロード
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
