import { useState, useEffect } from "react";
import { assets } from "../../assets/assets.mjs";
import VenueMediaForm from "./VenueMediaForm";
import VenueFacilitiesForm from "./VenueFacilitiesForm";
import VenueLocationForm from "./VenueLocationForm";
import { useDarkMode } from "../../hooks/useDarkMode";
import FocusLock from "react-focus-lock";

const CreateVenueModal = ({
  isOpen,
  onClose,
  onSuccess,
  onCreateVenue,
  onEditVenue,
  venueToEdit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    rating: "",
    media: [],
    meta: { wifi: false, parking: false, breakfast: false, pets: false },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: "",
      lng: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const { isDarkMode } = useDarkMode();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Prefill for editing
  useEffect(() => {
    if (venueToEdit) {
      setFormData({
        name: venueToEdit.name || "",
        description: venueToEdit.description || "",
        price: venueToEdit.price || "",
        maxGuests: venueToEdit.maxGuests || "",
        rating: venueToEdit.rating || "",
        media: venueToEdit.media || [],
        meta: venueToEdit.meta || {
          wifi: false,
          parking: false,
          breakfast: false,
          pets: false,
        },
        location: venueToEdit.location || {
          address: "",
          city: "",
          zip: "",
          country: "",
          continent: "",
          lat: "",
          lng: "",
        },
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        maxGuests: "",
        rating: "",
        media: [],
        meta: { wifi: false, parking: false, breakfast: false, pets: false },
        location: {
          address: "",
          city: "",
          zip: "",
          country: "",
          continent: "",
          lat: "",
          lng: "",
        },
      });
    }
  }, [venueToEdit]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const cleanData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      maxGuests: parseInt(formData.maxGuests),
      rating: formData.rating ? parseFloat(formData.rating) : 0,
      media: formData.media,
      meta: formData.meta,
      location: {
        ...formData.location,
        lat: formData.location.lat ? parseFloat(formData.location.lat) : 0,
        lng: formData.location.lng ? parseFloat(formData.location.lng) : 0,
      },
    };

    try {
      if (venueToEdit && onEditVenue) {
        await onEditVenue(cleanData);
        onSuccess?.("Venue updated successfully!");
        onClose(); // only success
      } else {
        await onCreateVenue(cleanData);
        onSuccess?.("Venue created successfully!");
        onClose(); // only success
      }
    } catch (err) {
      setError(err.message || "Failed to save venue.");
      console.error(err);
    } finally {
      setIsSubmitting(false); // always reset
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <FocusLock>
        <div className="bg-background text-text rounded-lg w-full  sm:max-w-2xl  max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-secondary border-b p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {venueToEdit ? "Edit Venue" : "Create New Venue"}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
              >
                <img
                  src={isDarkMode ? assets.cross_icon_white : assets.cross_icon}
                  alt="Close Button"
                />
              </button>
            </div>
          </div>

          {/* Wrap everything in a form element */}
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Venue Detail */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm mb-1">
                    Name <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter venue name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    step="0.1"
                    className="w-full p-2 border rounded"
                    placeholder="0.0 - 5.0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Description <span className="text-red-700">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border rounded"
                  placeholder="Describe your venue"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">
                    Price per night <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="1"
                    className="w-full p-2 border rounded"
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">
                    Max Guests <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="number"
                    name="maxGuests"
                    value={formData.maxGuests}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full p-2 border rounded"
                    placeholder="1"
                    required
                  />
                </div>
              </div>
            </div>

            <VenueMediaForm
              media={formData.media}
              setMedia={(newMedia) =>
                setFormData((prev) => ({ ...prev, media: newMedia }))
              }
            />

            <VenueFacilitiesForm
              meta={formData.meta}
              setMeta={(newMeta) =>
                setFormData((prev) => ({ ...prev, meta: newMeta }))
              }
            />

            <VenueLocationForm
              location={formData.location}
              setLocation={(newLocation) =>
                setFormData((prev) => ({ ...prev, location: newLocation }))
              }
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">
                {error}
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-accent text-white rounded hover:bg-primary cursor-pointer disabled:opacity-50"
              >
                {isSubmitting
                  ? venueToEdit
                    ? "Updating..."
                    : "Creating..."
                  : venueToEdit
                  ? "Update Venue"
                  : "Create Venue"}
              </button>
            </div>
          </form>
        </div>
      </FocusLock>
    </div>
  );
};

export default CreateVenueModal;
