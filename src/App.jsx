import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Venue from "./pages/Venue";
import { ToastContainer } from "react-toastify";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import ProtectedRoute from "./context/ProtectedRoute";
import VenueManager from "./pages/VenueManager";
import ScrollToTop from "./components/routing/ScrollToTop";
function App() {
  return (
    <>
      <Navbar />
      <ToastContainer theme="dark" />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/venue/:id" element={<Venue />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/venuemanager"
          element={
            <ProtectedRoute requireVenueManager={true}>
              <VenueManager />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
