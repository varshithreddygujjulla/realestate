import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function PlotDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isMobile = window.innerWidth <= 768;

  const [plot, setPlot] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchPlot = async () => {
      try {
        const response = await api.get(`/plots/${id}`);
        const fetchedPlot = response.data.plot;
        setPlot(fetchedPlot);

        const firstImage =
          fetchedPlot.image && fetchedPlot.image.trim() !== ""
            ? fetchedPlot.image
            : "https://via.placeholder.com/700x420?text=Plot+Image";

        setSelectedImage(firstImage);
      } catch (error) {
        console.log("Error fetching plot details:", error);
      }
    };

    fetchPlot();
  }, [id]);

  const galleryImages = useMemo(() => {
    if (!plot) return [];

    const firstImage =
      plot.image && plot.image.trim() !== ""
        ? plot.image
        : "https://via.placeholder.com/700x420?text=Plot+Image";

    return [firstImage, firstImage, firstImage, firstImage];
  }, [plot]);

  const handleDelete = async () => {
    try {
      await api.delete(`/plots/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/");
    } catch (error) {
      console.log("Error deleting plot:", error);
    }
  };

  if (!plot) {
    return <p style={styles.loading}>Loading plot details...</p>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.breadcrumbs}>
          <Link to="/" style={styles.breadcrumbLink}>
            Plots
          </Link>
          <span style={styles.breadcrumbSeparator}>›</span>
          <span style={styles.breadcrumbCurrent}>{plot.plotName}</span>
        </div>

        <div
  style={{
    ...styles.topSection,
    gridTemplateColumns: isMobile ? "1fr" : "1.4fr 1fr",
  }}
>
          <div style={styles.leftColumn}>
            <div style={styles.mainImageCard}>
              <img
                src={selectedImage}
                alt={plot.plotName}
                style={{
  ...styles.mainImage,
  height: isMobile ? "240px" : "400px",
}}
              />
            </div>

            <div style={styles.thumbnailRow}>
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    ...styles.thumbButton,
                    border:
                      selectedImage === img
                        ? "2px solid #2563eb"
                        : "1px solid #d1d5db",
                  }}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    style={styles.thumbnail}
                  />
                </button>
              ))}
            </div>

            <div style={styles.highlightsCard}>
              <h3 style={styles.sectionTitle}>Key Highlights</h3>

            <div
  style={{
    ...styles.highlightsGrid,
    gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(2, 1fr)",
  }}
>
                <div style={styles.highlightBox}>
                  <p style={styles.highlightTitle}>Facing</p>
                  <p style={styles.highlightText}>{plot.facing}</p>
                </div>

                <div style={styles.highlightBox}>
                  <p style={styles.highlightTitle}>Area</p>
                  <p style={styles.highlightText}>{plot.area}</p>
                </div>

                <div style={styles.highlightBox}>
                  <p style={styles.highlightTitle}>Location</p>
                  <p style={styles.highlightText}>{plot.location}</p>
                </div>

                <div style={styles.highlightBox}>
                  <p style={styles.highlightTitle}>Ready to Visit</p>
                  <p style={styles.highlightText}>Yes</p>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.rightColumn}>
            <div style={styles.detailsCard}>
              <h1 style={styles.heading}>{plot.plotName}</h1>
              <p style={styles.locationText}>{plot.location}</p>

              <div style={styles.detailsTable}>
                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Facing</span>
                  <span style={styles.detailValue}>{plot.facing}</span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Plot Area</span>
                  <span style={styles.detailValue}>{plot.area}</span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Price per sq yd</span>
                  <span style={styles.detailValue}>₹ {plot.pricePerSqYard}</span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Total Price</span>
                  <span style={styles.totalPrice}>₹ {plot.totalPrice}</span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailLabel}>Plot Number</span>
                  <span style={styles.detailValue}>{plot.plotNumber}</span>
                </div>
              </div>

              <p style={styles.descriptionTitle}>Description</p>
              <p style={styles.descriptionText}>{plot.description}</p>

              <div
  style={{
    ...styles.actionButtons,
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
  }}
>
                <a href="tel:9876543210" style={styles.callBtn}>
                  Call Owner
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  style={styles.whatsappBtn}
                >
                  WhatsApp
                </a>
              </div>

              {token && (
<div
  style={{
    ...styles.ownerButtons,
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
  }}
>
                  <Link to={`/edit-plot/${plot._id}`} style={styles.editBtn}>
                    Edit Plot
                  </Link>

                  <button onClick={handleDelete} style={styles.deleteBtn}>
                    Delete Plot
                  </button>
                </div>
              )}
            </div>

            <div style={styles.mapCard}>
              <h3 style={styles.sectionTitle}>Location</h3>
              <p style={styles.mapText}>{plot.location}</p>

              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(
                  plot.location
                )}`}
                target="_blank"
                rel="noreferrer"
                style={styles.mapLink}
              >
                View on Maps
              </a>
            </div>
          </div>
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
    maxWidth: "1200px",
    margin: "0 auto",
  },
  loading: {
    textAlign: "center",
    marginTop: "40px",
    fontSize: "16px",
    color: "#6b7280",
  },
  breadcrumbs: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "14px",
    fontSize: "13px",
    color: "#6b7280",
    flexWrap: "wrap",
  },
  breadcrumbLink: {
    textDecoration: "none",
    color: "#2563eb",
  },
  breadcrumbSeparator: {
    color: "#9ca3af",
  },
  breadcrumbCurrent: {
    color: "#4b5563",
  },
  topSection: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "18px",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  mainImageCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  mainImage: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    display: "block",
  },
  thumbnailRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
  },
  thumbButton: {
    padding: "0",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  thumbnail: {
    width: "100%",
    height: "78px",
    objectFit: "cover",
    display: "block",
  },
  detailsCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "18px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  heading: {
    margin: "0 0 8px 0",
    fontSize: "28px",
    color: "#111827",
    lineHeight: "1.25",
  },
  locationText: {
    margin: "0 0 16px 0",
    fontSize: "14px",
    color: "#6b7280",
  },
  detailsTable: {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "16px",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    padding: "12px 14px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "14px",
  },
  detailLabel: {
    color: "#6b7280",
    fontWeight: "500",
  },
  detailValue: {
    color: "#111827",
    fontWeight: "600",
    textAlign: "right",
  },
  totalPrice: {
    color: "#16a34a",
    fontWeight: "700",
    textAlign: "right",
  },
  descriptionTitle: {
    margin: "0 0 6px 0",
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
  },
  descriptionText: {
    margin: "0 0 16px 0",
    fontSize: "14px",
    color: "#4b5563",
    lineHeight: "1.6",
  },
  actionButtons: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  callBtn: {
    textDecoration: "none",
    textAlign: "center",
    padding: "12px 14px",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
  },
  whatsappBtn: {
    textDecoration: "none",
    textAlign: "center",
    padding: "12px 14px",
    borderRadius: "10px",
    backgroundColor: "#16a34a",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
  },
  ownerButtons: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "12px",
  },
  editBtn: {
    textDecoration: "none",
    textAlign: "center",
    padding: "11px 14px",
    borderRadius: "10px",
    backgroundColor: "#111827",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
  },
  deleteBtn: {
    border: "none",
    padding: "11px 14px",
    borderRadius: "10px",
    backgroundColor: "#dc2626",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  highlightsCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  sectionTitle: {
    margin: "0 0 12px 0",
    fontSize: "18px",
    color: "#111827",
  },
  highlightsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
  },
  highlightBox: {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "12px",
    backgroundColor: "#f9fafb",
  },
  highlightTitle: {
    margin: "0 0 5px 0",
    fontSize: "13px",
    fontWeight: "700",
    color: "#374151",
  },
  highlightText: {
    margin: 0,
    fontSize: "13px",
    color: "#6b7280",
    lineHeight: "1.5",
  },
  mapCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  mapText: {
    margin: "0 0 10px 0",
    fontSize: "14px",
    color: "#4b5563",
  },
  mapLink: {
    textDecoration: "none",
    color: "#2563eb",
    fontSize: "14px",
    fontWeight: "600",
  },
};

export default PlotDetails;