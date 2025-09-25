import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import VenueDetail from "./pages/VenueDetail";
import { ToastContainer } from "react-toastify";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import ProtectedRoute from "./context/ProtectedRoute";
import VenueManager from "./pages/VenueManager";
import ScrollToTop from "./components/routing/ScrollToTop";
import BackToTopButton from "./components/routing/BackToTopButton";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
      <Navbar />
      <ToastContainer theme="dark" />
      <BackToTopButton />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/venue/:id" element={<VenueDetail />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
