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
      <div className="max-w-6xl mx-auto my-25">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-medium text-text">
            Manage Your Venues ✨
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex bg-secondary/20 pt-6 px-2 mb-5 rounded-2xl">
          <div className="mb-4 relative inline-block">
            <button
              onClick={() => setActiveTab("venues")}
              className="text-xl font-semibold text-text mb-1 cursor-pointer transition-colors duration-200 hover:text-primary"
            >
              Venues
            </button>
            {activeTab === "venues" && (
              <hr className="h-3 border-0 bg-primary rounded-br-2xl w-full" />
            )}
          </div>

          <div className="mb-4 relative inline-block ml-8">
            <button
              onClick={() => setActiveTab("bookings")}
              className="text-xl font-semibold text-text mb-1 cursor-pointer transition-colors duration-200 hover:text-primary"
            >
              Bookings
            </button>
            {activeTab === "bookings" && (
              <hr className="h-3 border-0 bg-primary rounded-br-2xl w-full" />
            )}
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
