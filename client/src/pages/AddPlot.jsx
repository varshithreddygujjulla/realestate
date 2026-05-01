import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ImageUpload from "../components/ImageUpload";
import ImageUpload from "../components/ImageUpload";

function AddPlot() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    plotName: "",
    plotNumber: "",
    facing: "",
    area: "",
    pricePerSqYard: "",
    totalPrice: "",
    location: "",
    description: "",
    image: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (url) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post("/plots", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Plot added successfully");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add plot");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Add Plot</h1>
          <p style={styles.subtext}>
            Enter the plot details below to list it on RealEstate.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Plot Name */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Plot Name *</label>
              <input
                type="text"
                name="plotName"
                placeholder="e.g. Venkat Reddy Plot"
                value={formData.plotName}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            {/* Plot Number */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Plot Number *</label>
              <input
                type="text"
                name="plotNumber"
                placeholder="e.g. A-123"
                value={formData.plotNumber}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            {/* Facing */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Facing *</label>
              <input
                type="text"
                name="facing"
                placeholder="e.g. West, North"
                value={formData.facing}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            {/* Area */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Area *</label>
              <input
                type="text"
                name="area"
                placeholder="e.g. 200 sq yd"
                value={formData.area}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            {/* Price Per Sq Yard */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Price Per Sq Yard *</label>
              <input
                type="number"
                name="pricePerSqYard"
                placeholder="e.g. 45000"
                value={formData.pricePerSqYard}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            {/* Total Price */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Total Price *</label>
              <input
                type="number"
                name="totalPrice"
                placeholder="e.g. 9000000"
                value={formData.totalPrice}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            {/* Location */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Location *</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Hayathnagar"
                value={formData.location}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            {/* Description */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                name="description"
                placeholder="Add details about the plot, amenities, etc."
                value={formData.description}
                onChange={handleChange}
                style={styles.textarea}
              />
            </div>

            {/* Image Upload */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Plot Image *</label>
              <ImageUpload
  value={formData.image}
  onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
/>
            </div>

            {/* Submit Button */}
            <button type="submit" style={styles.button}>
              ➕ Add Plot
            </button>

            {/* Message */}
            {message && (
              <p style={message.includes("successfully") ? styles.successMsg : styles.errorMsg}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "16px 12px 28px",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "18px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  },
  heading: {
    margin: "0 0 6px 0",
    fontSize: "26px",
    fontWeight: "800",
    color: "#111827",
  },
  subtext: {
    margin: "0 0 20px 0",
    fontSize: "13px",
    color: "#6b7280",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    padding: "13px 14px",
    fontSize: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#111827",
    caretColor: "#111827",
    colorScheme: "light",
    boxSizing: "border-box",
    width: "100%",
  },
  textarea: {
    padding: "13px 14px",
    fontSize: "16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    outline: "none",
    minHeight: "100px",
    resize: "vertical",
    backgroundColor: "#fff",
    color: "#111827",
    caretColor: "#111827",
    colorScheme: "light",
    boxSizing: "border-box",
    width: "100%",
    fontFamily: "inherit",
  },
  button: {
    border: "none",
    padding: "15px 18px",
    borderRadius: "8px",
    backgroundColor: "#111827",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    minHeight: "48px",
    marginTop: "6px",
  },
  successMsg: {
    margin: "0",
    fontSize: "14px",
    color: "#16a34a",
    fontWeight: "600",
    textAlign: "center",
  },
  errorMsg: {
    margin: "0",
    fontSize: "14px",
    color: "#dc2626",
    fontWeight: "600",
    textAlign: "center",
  },
};

export default AddPlot;
