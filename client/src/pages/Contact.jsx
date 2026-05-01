function Contact() {
  // Owner info saved to localStorage when they log in
  const ownerName = localStorage.getItem("ownerName") || "Real Estate Owner";
  const ownerPhone = localStorage.getItem("ownerPhone") || "Contact via WhatsApp";

  const whatsappLink = ownerPhone.match(/\d+/)
    ? `https://wa.me/91${ownerPhone.replace(/\D/g, "")}`
    : "#";

  const callLink = ownerPhone.match(/\d+/)
    ? `tel:${ownerPhone.replace(/\D/g, "")}`
    : "#";

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <div style={styles.card}>
          <div style={styles.iconWrap}>🏠</div>
          <h1 style={styles.heading}>Contact Us</h1>
          <p style={styles.subtext}>
            Interested in a plot? Reach out directly and we'll help you find the right one.
          </p>

          <div style={styles.infoBlock}>
            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>👤</span>
              <div>
                <p style={styles.infoLabel}>Agent Name</p>
                <p style={styles.infoValue}>{ownerName}</p>
              </div>
            </div>

            <div style={styles.divider} />

            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>📞</span>
              <div>
                <p style={styles.infoLabel}>Phone Number</p>
                <p style={styles.infoValue}>{ownerPhone}</p>
              </div>
            </div>

            <div style={styles.divider} />

            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>🕐</span>
              <div>
                <p style={styles.infoLabel}>Working Hours</p>
                <p style={styles.infoValue}>Mon – Sat, 9:00 AM – 7:00 PM</p>
              </div>
            </div>

            <div style={styles.divider} />

            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>📍</span>
              <div>
                <p style={styles.infoLabel}>Service Area</p>
                <p style={styles.infoValue}>Hyderabad & Surrounding Areas</p>
              </div>
            </div>
          </div>

          <div style={styles.btnRow}>
            <a href={callLink} style={styles.callBtn}>
              📞 Call Now
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.whatsappBtn}
            >
              💬 WhatsApp
            </a>
          </div>

          <p style={styles.note}>
            We typically respond within a few hours. Feel free to reach out anytime.
          </p>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "24px 16px 40px",
  },
  container: {
    maxWidth: "560px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "20px",
    padding: "28px 24px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
    textAlign: "center",
  },
  iconWrap: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  heading: {
    margin: "0 0 8px 0",
    fontSize: "28px",
    fontWeight: "800",
    color: "#111827",
  },
  subtext: {
    margin: "0 0 24px 0",
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: "1.6",
  },
  infoBlock: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "4px 0",
    marginBottom: "20px",
    textAlign: "left",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 18px",
  },
  infoIcon: {
    fontSize: "22px",
    flexShrink: 0,
  },
  infoLabel: {
    margin: "0 0 2px 0",
    fontSize: "12px",
    color: "#9ca3af",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  infoValue: {
    margin: 0,
    fontSize: "15px",
    color: "#111827",
    fontWeight: "600",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "0 18px",
  },
  btnRow: {
    display: "flex",
    gap: "12px",
    marginBottom: "16px",
  },
  callBtn: {
    flex: 1,
    display: "block",
    padding: "13px",
    backgroundColor: "#111827",
    color: "white",
    textDecoration: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    textAlign: "center",
  },
  whatsappBtn: {
    flex: 1,
    display: "block",
    padding: "13px",
    backgroundColor: "#16a34a",
    color: "white",
    textDecoration: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    textAlign: "center",
  },
  note: {
    margin: 0,
    fontSize: "13px",
    color: "#9ca3af",
    lineHeight: "1.5",
  },
};

export default Contact;
