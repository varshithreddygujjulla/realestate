import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
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
      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);

      // Store owner info so the Contact page can display it
      if (response.data.owner) {
        localStorage.setItem("ownerName", response.data.owner.name || "");
        localStorage.setItem("ownerPhone", response.data.owner.phone || "");
      }

      setMessage("Login successful");
      navigate("/plots");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Owner Login</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    colorScheme: "light",
    color: "#111827",
    backgroundColor: "#fff",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "black",
    color: "white",
    cursor: "pointer",
  },
  message: {
    marginTop: "16px",
    textAlign: "center",
    fontSize: "14px",
  },
};

export default Login;
