import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("ownerName");
  localStorage.removeItem("ownerPhone");
  navigate("/login");
};

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logoWrap} onClick={handleNavClick}>
          <div style={styles.logoIcon}>🏠</div>
          <span style={styles.logoText}>RealEstate</span>
        </Link>

        {/* Desktop Navigation */}
        <nav style={styles.desktopNav}>
          <Link to="/" style={styles.navLink}>
            Plots
          </Link>
          <Link to="/contact" style={styles.navLink}>
            Contact
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div style={styles.desktopActions}>
          <Link to="/contact" style={styles.ctaBtn}>
            WhatsApp / Call
          </Link>

          {token ? (
            <>
              <Link to="/add-plot" style={styles.secondaryBtn}>
                Add Plot
              </Link>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={styles.secondaryBtn}>
              Owner Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          style={styles.hamburger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span style={styles.hamburgerLine} />
          <span style={styles.hamburgerLine} />
          <span style={styles.hamburgerLine} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={styles.mobileNavLink} onClick={handleNavClick}>
            📍 Plots
          </Link>
          <Link to="/contact" style={styles.mobileNavLink} onClick={handleNavClick}>
            📞 Contact
          </Link>
          <Link
            to="/contact"
            style={{ ...styles.mobileNavLink, backgroundColor: "#16a34a", color: "white" }}
            onClick={handleNavClick}
          >
            💬 WhatsApp / Call
          </Link>

          {token ? (
            <>
              <Link
                to="/add-plot"
                style={{ ...styles.mobileNavLink, backgroundColor: "#f3f4f6" }}
                onClick={handleNavClick}
              >
                ➕ Add Plot
              </Link>
              <button onClick={handleLogout} style={styles.mobileLogoutBtn}>
                🚪 Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              style={{ ...styles.mobileNavLink, backgroundColor: "#111827", color: "white" }}
              onClick={handleNavClick}
            >
              🔑 Owner Login
            </Link>
          )}
        </div>
      )}
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
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    minWidth: "fit-content",
  },
  logoIcon: {
    fontSize: "24px",
  },
  logoText: {
    textDecoration: "none",
    color: "#1d4ed8",
    fontSize: "18px",
    fontWeight: "800",
  },
  desktopNav: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    flex: 1,
    justifyContent: "center",
  },
  navLink: {
    textDecoration: "none",
    color: "#374151",
    fontSize: "14px",
    fontWeight: "500",
  },
  desktopActions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  ctaBtn: {
    textDecoration: "none",
    backgroundColor: "#16a34a",
    color: "white",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
  },
  secondaryBtn: {
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
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "6px",
    border: "none",
    background: "none",
    cursor: "pointer",
    padding: "8px",
  },
  hamburgerLine: {
    width: "24px",
    height: "3px",
    backgroundColor: "#111827",
    borderRadius: "2px",
    transition: "all 0.3s",
  },
  mobileMenu: {
    display: "none",
    flexDirection: "column",
    gap: "8px",
    padding: "12px 16px",
    backgroundColor: "#f9fafb",
    borderTop: "1px solid #e5e7eb",
  },
  mobileNavLink: {
    display: "block",
    padding: "12px 16px",
    textDecoration: "none",
    color: "#111827",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
  },
  mobileLogoutBtn: {
    padding: "12px 16px",
    textDecoration: "none",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "8px",
    textAlign: "center",
    backgroundColor: "#111827",
    border: "none",
    cursor: "pointer",
    width: "100%",
  },

  // Media query styles (applied via JavaScript for better compatibility)
  "@media (max-width: 768px)": {
    desktopNav: {
      display: "none",
    },
    desktopActions: {
      display: "none",
    },
    hamburger: {
      display: "flex",
    },
    mobileMenu: {
      display: "flex",
    },
  },
};

export default Navbar;
