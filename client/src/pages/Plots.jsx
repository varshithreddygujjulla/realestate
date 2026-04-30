import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import PlotCard from "../components/PlotCard";

function Plots() {
  const [plots, setPlots] = useState([]);
  const [filters, setFilters] = useState({
    facing: "",
    location: "",
    budget: "",
    area: "",
  });

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const response = await api.get("/plots");
        setPlots(response.data.plots);
      } catch (error) {
        console.log("Error fetching plots:", error);
      }
    };

    fetchPlots();
  }, []);

  const uniqueFacings = [...new Set(plots.map((plot) => plot.facing).filter(Boolean))];
  const uniqueLocations = [...new Set(plots.map((plot) => plot.location).filter(Boolean))];

  const filteredPlots = useMemo(() => {
    return plots.filter((plot) => {
      const facingMatch = filters.facing ? plot.facing === filters.facing : true;
      const locationMatch = filters.location ? plot.location === filters.location : true;

      const budgetMatch = filters.budget
        ? Number(plot.totalPrice) <= Number(filters.budget)
        : true;

      const areaNumber = parseInt(plot.area);
      const areaMatch = filters.area
        ? !isNaN(areaNumber) && areaNumber >= Number(filters.area)
        : true;

      return facingMatch && locationMatch && budgetMatch && areaMatch;
    });
  }, [plots, filters]);

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      facing: "",
      location: "",
      budget: "",
      area: "",
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Available Plots</h1>
        <p style={styles.subtext}>
          Explore verified plots and connect with genuine owners in your area.
        </p>

        <div style={styles.filterBar}>
          <div style={styles.filterItem}>
            <label style={styles.label}>Facing</label>
            <select
              name="facing"
              value={filters.facing}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">All Facings</option>
              {uniqueFacings.map((facing) => (
                <option key={facing} value={facing}>
                  {facing}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label style={styles.label}>Budget</label>
            <select
              name="budget"
              value={filters.budget}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">All Budgets</option>
              <option value="500000">Up to ₹ 5,00,000</option>
              <option value="1000000">Up to ₹ 10,00,000</option>
              <option value="5000000">Up to ₹ 50,00,000</option>
              <option value="10000000">Up to ₹ 1,00,00,000</option>
            </select>
          </div>

          <div style={styles.filterItem}>
            <label style={styles.label}>Location</label>
            <select
              name="location"
              value={filters.location}
              onChange={handleChange}
              style={styles.select }
              
            >
              <option value="">All Locations</option>
              {uniqueLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.filterItem}>
            <label style={styles.label}>Area</label>
            <select
              name="area"
              value={filters.area}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">All Areas</option>
              <option value="100">100+ sq yd</option>
              <option value="200">200+ sq yd</option>
              <option value="300">300+ sq yd</option>
              <option value="500">500+ sq yd</option>
            </select>
          </div>

          <button onClick={clearFilters} style={styles.clearBtn}>
            Clear Filters
          </button>
        </div>

        <p style={styles.countText}>
          Showing {filteredPlots.length} plot{filteredPlots.length !== 1 ? "s" : ""}
        </p>

        {filteredPlots.length === 0 ? (
          <p style={styles.empty}>No plots found</p>
        ) : (
          <div style={styles.grid}>
            {filteredPlots.map((plot) => (
              <PlotCard key={plot._id} plot={plot} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    padding: "18px 12px 30px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "34px",
    fontWeight: "800",
    color: "#111827",
    marginBottom: "8px",
  },
  subtext: {
    fontSize: "15px",
    color: "#6b7280",
    marginBottom: "20px",
  },
  filterBar: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "14px",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    marginBottom: "18px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  filterItem: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
  },
  select: {
  padding: "11px 12px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  outline: "none",
  backgroundColor: "#ffffff",
  color: "#111827",
},
  clearBtn: {
    border: "1px solid #93c5fd",
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    borderRadius: "10px",
    padding: "11px 14px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    alignSelf: "end",
  },
  countText: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
  },
  empty: {
    textAlign: "center",
    fontSize: "16px",
    color: "#6b7280",
  },
};

export default Plots;