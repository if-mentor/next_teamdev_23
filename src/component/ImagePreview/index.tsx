"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./style.module.css";

const ImagePreview = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // 画像生成処理
  const handleFile = useCallback((file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setPreviewUrl(imageUrl);
  }, []);

  // クリックでinputを開く
  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  // ファイル選択時
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      handleFile(file);
    }
  };

  // ドラッグ中
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // ドロップ時
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImageFile(file);
      handleFile(file);
    }
  };

  // メモリリーク対策
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.uploadArea} ${
          isDragging ? styles.dragging : ""
        }`}
        onClick={handleUploadClick}
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
            </label>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />
      </div>
    </div>
  );
};

export default ImagePreview;
