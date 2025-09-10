import { useState, useEffect, useCallback } from "react";
import { assets } from "../../assets/assets.mjs";
import useEmblaCarousel from "embla-carousel-react";
import { toast } from "react-toastify";

const VenueMediaForm = ({ media, setMedia }) => {
  const [currentPhoto, setCurrentPhoto] = useState({ url: "", alt: "" });

  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    draggable: true,
    skipSnaps: true,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePhotoInputChange = (field, value) => {
    setCurrentPhoto((prev) => ({ ...prev, [field]: value }));
  };

  const addPhoto = () => {
    if (currentPhoto.url.trim()) {
      if (media.length >= 8) {
        toast.warning("You have reached the maximum of 8 photos.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      setMedia([...media, { ...currentPhoto }]);
      setCurrentPhoto({ url: "", alt: "" });
      setSelectedIndex(media.length); // focus on the new image
    }
  };

  const removePhoto = (removeIndex) => {
    const newMedia = media.filter((_, i) => i !== removeIndex);
    setMedia(newMedia);
    setSelectedIndex(Math.min(selectedIndex, newMedia.length - 1));
  };

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
  }, [embla, onSelect]);

  const scrollTo = (index) => embla && embla.scrollTo(index);

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Photos</h3>

      <div className="space-y-2">
        <div className="flex gap-2 flex-col sm:flex-row">
          <input
            type="url"
            value={currentPhoto.url}
            onChange={(e) => handlePhotoInputChange("url", e.target.value)}
            placeholder="Image URL"
            className="flex-1 p-2 border rounded"
          />
          <input
            type="text"
            value={currentPhoto.alt}
            onChange={(e) => handlePhotoInputChange("alt", e.target.value)}
            placeholder="Alt text"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={addPhoto}
            disabled={!currentPhoto.url.trim()}
            className="px-3 py-2 cursor-pointer bg-accent text-background rounded disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>

      {media.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            {media.length} photo(s) added:
          </p>

          {/* Embla Carousel */}
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="flex gap-2">
              {media.map((photo, idx) => (
                <div
                  key={photo.url || `${idx}-${photo.alt || "photo"}`}
                  className="flex-shrink-0 w-full object-cover object-center max-w-64 relative"
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-40 object-cover rounded border"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="hidden w-full h-40 bg-gray-100 rounded border items-center justify-center text-xs text-gray-500">
                    Invalid Image
                  </div>
                  <button
                    type="button"
                    onClick={() => removePhoto(idx)}
                    className="absolute top-0 right-0 w-6 h-6 cursor-pointer bg-primary p-0.5 rounded-sm text-xs"
                  >
                    <img
                      src={assets.cross_icon}
                      className="rounded-md"
                      alt=""
                    />
                  </button>
                  {photo.alt && (
                    <p
                      className="text-xs text-gray-500 mt-1 truncate"
                      title={photo.alt}
                    >
                      {photo.alt}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-2 gap-2">
            {media.map((photo, idx) => (
              <button
                key={photo.url || `${idx}-dot`}
                type="button"
                onClick={() => scrollTo(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  selectedIndex === idx ? "bg-primary" : "bg-secondary"
                }`}
              ></button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueMediaForm;
