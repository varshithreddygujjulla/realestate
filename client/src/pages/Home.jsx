import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <h1 style={styles.heading}>Find Plots Easily</h1>
        <p style={styles.subtext}>
          Browse available plots, check details, and contact the owner quickly.
        </p>

        <Link to="/plots" style={styles.button}>
          View Available Plots
        </Link>
      </section>

      <section style={styles.features}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Easy to Browse</h3>
          <p style={styles.cardText}>
            View all available plots in one place from your phone.
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Clear Details</h3>
          <p style={styles.cardText}>
            Check location, facing, area, and price before contacting.
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Quick Contact</h3>
          <p style={styles.cardText}>
            Reach the owner directly after shortlisting a plot.
          </p>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "16px",
  },
  hero: {
    maxWidth: "520px",
    margin: "20px auto",
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "28px 20px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  heading: {
    fontSize: "30px",
    marginBottom: "14px",
    lineHeight: "1.2",
  },
  subtext: {
    fontSize: "16px",
    color: "#444",
    marginBottom: "22px",
    lineHeight: "1.6",
  },
  button: {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: "10px",
    backgroundColor: "black",
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
  },
  features: {
    maxWidth: "520px",
    margin: "18px auto",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "14px",
    padding: "18px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  },
  cardTitle: {
    fontSize: "18px",
    marginBottom: "8px",
  },
  cardText: {
    fontSize: "15px",
    color: "#444",
    lineHeight: "1.5",
  },
};

export default Home;