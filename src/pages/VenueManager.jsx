import { useState, useEffect } from "react";
import CreateVenueModal from "../components/manager/CreateVenueModal";
import ManagerVenueGrid from "../components/manager/AddVenueCard";
import BookingCarousel from "../components/manager/BookingCarousel";
import ConfirmDeleteModal from "../components/manager/ConfirmDeleteModal";
import { toast } from "react-toastify";
import { getToday } from "../utils/todayDate.mjs";
import {
  createVenue,
  editVenue,
  deleteVenue,
  getProfileVenues,
} from "../API/managerService.mjs";

const VenueManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("venues");

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingVenue, setEditingVenue] = useState(null); // For edit modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState(null);

  // Fetch venues on mount
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getProfileVenues();
        setVenues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  // Handle create venue
  const handleCreateVenue = async (venueData) => {
    try {
      await createVenue(venueData);
      const updated = await getProfileVenues();
      setVenues(updated);
      toast.success("Venue Created Successfully");
    } catch (err) {
      console.error("Error creating venue:", err);
      throw err;
    }
  };

  // Handle edit venue
  const handleEditVenue = async (venueData) => {
    if (!editingVenue) return;
    try {
      await editVenue(editingVenue.id, venueData);
      const updated = await getProfileVenues();
      setVenues(updated);
      toast.success("Venue Updated Successfully");
    } catch (err) {
      console.error("Error updating venue:", err);
      throw err;
    }
  };

  // Open create modal
  const handleAddVenue = () => {
    setEditingVenue(null);
    setIsModalOpen(true);
  };

  // Open edit modal
  const handleEditClick = (venue) => {
    setEditingVenue(venue);
    setIsModalOpen(true);
  };

  // Open delete modal
  const handleDeleteClick = (venue) => {
    setVenueToDelete(venue);
    setDeleteModalOpen(true);
  };

  // Confirm deletion
  const handleConfirmDelete = async () => {
    try {
      await deleteVenue(venueToDelete.id);
      setVenues((prev) => prev.filter((v) => v.id !== venueToDelete.id));
      setDeleteModalOpen(false);
      setVenueToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background p-2">
      <div className="max-w-6xl mx-auto mt-25">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-medium text-text">
            Manage Your Venues ✨
          </h1>
        </div>

        {/* Tabs */}
        <div className="w-full border-text/30 bg-secondary/20 rounded-lg">
          <div className="flex max-w-[300px] text-lg gap-1 border-text/30 bg-accent/10 shadow-sm mb-15">
            <button
              onClick={() => setActiveTab("venues")}
              className={`flex-1 cursor-pointer py-2 text-center font-medium shadow-md shadow-[#0b1d2b]/60 rounded-md transition-all duration-200 ${
                activeTab === "venues"
                  ? "bg-primary text-background"
                  : "bg-gray-300 text-[#0b1d2b]/70 hover:text-background hover:bg-primary/60"
              }`}
            >
              Venues
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`flex-1 cursor-pointer py-2 text-center font-medium shadow-md shadow-[#0b1d2b]/60 rounded-md transition-all duration-200 ${
                activeTab === "bookings"
                  ? "bg-primary text-background"
                  : "bg-gray-300 text-[#0b1d2b]/70 hover:text-background hover:bg-primary/60"
              }`}
            >
              Bookings
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "venues" && (
          <div>
            {loading && <p className="text-text/70">Loading venues...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && !error && (
              <ManagerVenueGrid
                venues={venues}
                onAddVenue={handleAddVenue}
                onEditVenue={handleEditClick}
                onDeleteVenue={handleDeleteClick}
              />
            )}

            {/* Delete Modal */}
            <ConfirmDeleteModal
              isOpen={deleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              onConfirm={handleConfirmDelete}
              venueName={venueToDelete?.name}
            />
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-8">
            {venues.map((venue) => {
              const futureBookings = (venue.bookings || []).filter(
                (b) => new Date(b.dateFrom) >= getToday()
              );

              return (
                <div key={venue.id}>
                  <h3 className="text-lg relative font-semibold text-text mb-3">
                    {venue.name}
                    <hr className="w-full rounded-2xl border-2 border-primary " />
                  </h3>
                  {futureBookings.length > 0 ? (
                    <BookingCarousel bookings={futureBookings} venue={venue} />
                  ) : (
                    <p className="text-sm text-gray-500">
                      No upcoming bookings
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <CreateVenueModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingVenue(null);
        }}
        onCreateVenue={handleCreateVenue}
        onEditVenue={handleEditVenue}
        venueToEdit={editingVenue}
        onSuccess={() => console.log("Venue created/edited successfully!")}
      />
    </div>
  );
};

export default VenueManager;
