import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>🏠</div>
          <Link to="/" style={styles.logoText}>
            RealEstate
          </Link>
        </div>

        <nav style={styles.centerNav}>
          <Link to="/" style={styles.activeLink}>
            Plots
          </Link>
          <a href="#" style={styles.link}>
            About
          </a>
          <a href="#" style={styles.link}>
            Contact
          </a>
        </nav>

        <div style={styles.rightNav}>
          <a href="tel:9876543210" style={styles.callBtn}>
            WhatsApp / Call
          </a>

          {token ? (
            <>
              <Link to="/add-plot" style={styles.ownerBtn}>
                Add Plot
              </Link>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={styles.ownerBtn}>
              Owner Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoIcon: {
    fontSize: "22px",
  },
  logoText: {
    textDecoration: "none",
    color: "#1d4ed8",
    fontSize: "20px",
    fontWeight: "800",
  },
  centerNav: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap",
  },
  link: {
    textDecoration: "none",
    color: "#374151",
    fontSize: "14px",
    fontWeight: "500",
  },
  activeLink: {
    textDecoration: "none",
    color: "#2563eb",
    fontSize: "14px",
    fontWeight: "700",
    paddingBottom: "6px",
    borderBottom: "2px solid #2563eb",
  },
  rightNav: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  callBtn: {
    textDecoration: "none",
    backgroundColor: "#16a34a",
    color: "white",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
  },
  ownerBtn: {
    textDecoration: "none",
    border: "1px solid #d1d5db",
    color: "#111827",
    backgroundColor: "#fff",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
  },
  logoutBtn: {
    border: "none",
    backgroundColor: "#111827",
    color: "white",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Navbar;