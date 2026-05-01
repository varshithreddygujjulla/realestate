import { useNavigate } from "react-router-dom";

function PlotCard({ plot }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleEdit = () => {
    navigate(`/edit-plot/${plot._id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this plot?")) return;

    try {
      const response = await fetch(`/api/plots/${plot._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting plot:", error);
    }
  };

  return (
    <div style={styles.card}>
      {/* Plot Image */}
      {plot.image && (
        <img
          src={plot.image}
          alt={plot.plotName}
          style={styles.image}
          onClick={() => navigate(`/plots/${plot._id}`)}
        />
      )}

      {/* Plot Info */}
      <div style={styles.content}>
        <h3 style={styles.title}>{plot.plotName}</h3>
        <p style={styles.location}>{plot.location}</p>

        {/* Details */}
        <div style={styles.details}>
          <span style={styles.detail}>
            <strong>{plot.area}</strong>
          </span>
          <span style={styles.detail}>
            <strong>{plot.facing}</strong>
          </span>
        </div>

        {/* Price */}
        <div style={styles.priceRow}>
          <span style={styles.price}>₹ {Number(plot.totalPrice).toLocaleString()}</span>
        </div>

        {/* Buttons */}
        <div style={styles.buttonGroup}>
          <button
            onClick={() => navigate(`/plots/${plot._id}`)}
            style={styles.viewBtn}
          >
            View Details
          </button>

          {token && (
            <>
              <button onClick={handleEdit} style={styles.editBtn}>
                Edit
              </button>
              <button onClick={handleDelete} style={styles.deleteBtn}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    display: "block",
    cursor: "pointer",
  },
  content: {
    padding: "12px 14px",
  },
  title: {
    margin: "0 0 4px 0",
    fontSize: "16px",
    fontWeight: "700",
    color: "#111827",
  },
  location: {
    margin: "0 0 8px 0",
    fontSize: "12px",
    color: "#6b7280",
  },
  details: {
    display: "flex",
    gap: "8px",
    marginBottom: "8px",
    flexWrap: "wrap",
  },
  detail: {
    fontSize: "12px",
    backgroundColor: "#f3f4f6",
    color: "#374151",
    padding: "4px 8px",
    borderRadius: "6px",
  },
  priceRow: {
    marginBottom: "10px",
  },
  price: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#16a34a",
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
    flexDirection: "column",
  },
  viewBtn: {
    width: "100%",
    padding: "11px 14px",
    backgroundColor: "#1d4ed8",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  editBtn: {
    width: "100%",
    padding: "11px 14px",
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  deleteBtn: {
    width: "100%",
    padding: "11px 14px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default PlotCard;
