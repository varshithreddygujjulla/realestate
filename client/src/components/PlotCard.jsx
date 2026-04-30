import { Link } from "react-router-dom";

function PlotCard({ plot }) {
  return (
    <div style={styles.card}>
      <div style={styles.imageWrap}>
        <img
          src={
            plot.image && plot.image.trim() !== ""
              ? plot.image
              : "https://via.placeholder.com/500x260?text=Plot+Image"
          }
          alt={plot.plotName}
          style={styles.image}
        />
      </div>

      <div style={styles.content}>
        <h3 style={styles.title}>{plot.plotName}</h3>

        <div style={styles.metaRow}>
          <span style={styles.meta}>{plot.area}</span>
          <span style={styles.meta}>{plot.facing}</span>
        </div>

        <p style={styles.location}>{plot.location}</p>

        <div style={styles.bottomRow}>
          <p style={styles.price}>₹ {plot.pricePerSqYard}</p>

          <Link to={`/plots/${plot._id}`} style={styles.button}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  imageWrap: {
    width: "100%",
  },
  image: {
    width: "100%",
    height: "140px",
    objectFit: "cover",
    display: "block",
  },
  content: {
    padding: "12px",
  },
  title: {
    fontSize: "15px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#111827",
    lineHeight: "1.3",
  },
  metaRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "6px",
  },
  meta: {
    fontSize: "12px",
    color: "#6b7280",
  },
  location: {
    margin: "0 0 10px 0",
    fontSize: "12px",
    color: "#4b5563",
    lineHeight: "1.4",
  },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },
  price: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "700",
    color: "#16a34a",
  },
  button: {
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #93c5fd",
    color: "#2563eb",
    backgroundColor: "#eff6ff",
    fontSize: "12px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
};

export default PlotCard;