import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

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
      navigate("/");
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
            <div style={styles.grid}>
              <input
                type="text"
                name="plotName"
                placeholder="Plot Name"
                value={formData.plotName}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="text"
                name="plotNumber"
                placeholder="Plot Number"
                value={formData.plotNumber}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="text"
                name="facing"
                placeholder="Facing"
                value={formData.facing}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="text"
                name="area"
                placeholder="Area"
                value={formData.area}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="number"
                name="pricePerSqYard"
                placeholder="Price Per Sq Yard"
                value={formData.pricePerSqYard}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="number"
                name="totalPrice"
                placeholder="Total Price"
                value={formData.totalPrice}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                style={{ ...styles.input, gridColumn: "1 / -1" }}
              />

              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                style={{ ...styles.input, gridColumn: "1 / -1" }}
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                style={{ ...styles.textarea, gridColumn: "1 / -1" }}
              />
            </div>

            <button type="submit" style={styles.button}>
              Add Plot
            </button>
          </form>

          {message && <p style={styles.message}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "18px 12px 28px",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  heading: {
    margin: "0 0 8px 0",
    fontSize: "30px",
    fontWeight: "800",
    color: "#111827",
  },
  subtext: {
    margin: "0 0 18px 0",
    fontSize: "14px",
    color: "#6b7280",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
  },
  input: {
    padding: "12px 14px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    outline: "none",
    backgroundColor: "#fff",
    color: "#111827",
    caretColor: "#111827",
  },
  textarea: {
    padding: "12px 14px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    outline: "none",
    minHeight: "110px",
    resize: "vertical",
    backgroundColor: "#fff",
    color: "#111827",
    caretColor: "#111827",
  },
  button: {
    border: "none",
    padding: "13px 16px",
    borderRadius: "10px",
    backgroundColor: "#111827",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  message: {
    marginTop: "6px",
    fontSize: "14px",
    color: "#16a34a",
  },
};

export default AddPlot;