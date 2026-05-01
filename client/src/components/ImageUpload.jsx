import { useState, useRef } from "react";

const CLOUD_NAME = "dn9rpkt30";
const UPLOAD_PRESET = "realestate_plots";

function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await response.json();
      if (data.secure_url) {
        onChange(data.secure_url);
      } else {
        setError("Upload failed.");
      }
    } catch (err) {
      setError("Upload failed. Try again.");
      console.error(err);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = () => onChange("");

  return (
    <div style={styles.wrapper}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading}
        style={styles.fileInput}
      />
      {value && (
        <div style={styles.previewSection}>
          <img src={value} alt="Plot" style={styles.preview} />
          <button type="button" onClick={handleRemove} style={styles.removeBtn}>
            ✕ Remove
          </button>
        </div>
      )}
      <div style={styles.orSection}>
        <div style={styles.divider} />
        <span style={styles.orText}>or paste URL</span>
        <div style={styles.divider} />
      </div>
      <input
        type="text"
        placeholder="https://example.com/image.jpg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={styles.urlInput}
      />
      {error && <p style={styles.errorText}>{error}</p>}
      {uploading && <p style={styles.loadingText}>⏳ Uploading...</p>}
    </div>
  );
}

const styles = {
  wrapper: { display: "flex", flexDirection: "column", gap: "12px" },
  fileInput: {
    padding: "12px 14px",
    fontSize: "14px",
    border: "2px dashed #d1d5db",
    borderRadius: "10px",
    backgroundColor: "#f9fafb",
    color: "#111827",
    cursor: "pointer",
    colorScheme: "light",
  },
  previewSection: {
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
  },
  preview: { width: "100%", height: "200px", objectFit: "cover" },
  removeBtn: {
    position: "absolute",
    top: "8px",
    right: "8px",
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "6px 10px",
    fontSize: "12px",
    cursor: "pointer",
  },
  orSection: { display: "flex", alignItems: "center", gap: "10px" },
  divider: { flex: 1, height: "1px", backgroundColor: "#e5e7eb" },
  orText: { fontSize: "12px", color: "#9ca3af" },
  urlInput: {
    padding: "12px 14px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    backgroundColor: "#fff",
    color: "#111827",
    colorScheme: "light",
  },
  errorText: { fontSize: "13px", color: "#dc2626" },
  loadingText: { fontSize: "13px", color: "#2563eb", fontWeight: "600" },
};

export default ImageUpload;