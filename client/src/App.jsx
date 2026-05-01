import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Plots from "./pages/Plots";
import PlotDetails from "./pages/PlotDetails";
import Login from "./pages/Login";
import AddPlot from "./pages/AddPlot";
import EditPlot from "./pages/EditPlot";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Plots />} />
        <Route path="/plots" element={<Plots />} />
        <Route path="/plots/:id" element={<PlotDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/add-plot"
          element={
            <ProtectedRoute>
              <AddPlot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-plot/:id"
          element={
            <ProtectedRoute>
              <EditPlot />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;