import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { assets } from "../../assets/assets.mjs";

const ImageCarousel = ({ images = [], isDarkMode }) => {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    skipSnaps: false,
    draggable: true,
    containScroll: "trimSnaps",
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    embla.on("reInit", onSelect);
    onSelect();
  }, [embla, onSelect]);

  // Fallback image if no images provided
  const displayImages = images?.length
    ? images
    : [{ url: assets.no_image_found, alt: "No image available" }];

  return (
    <div className="relative rounded-lg overflow-hidden">
      {/* Arrows */}
      {displayImages.length > 1 && canScrollPrev && (
        <button
          onClick={scrollPrev}
          className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 z-10 bg-secondary/70 hover:bg-secondary text-text rounded-full p-2 shadow-md"
        >
          <img
            src={isDarkMode ? assets.dropdown_icon_white : assets.dropdown_icon}
            className="rotate-90"
            alt="Prev"
          />
        </button>
      )}
      {displayImages.length > 1 && canScrollNext && (
        <button
          onClick={scrollNext}
          className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 z-10 bg-secondary/70 hover:bg-secondary text-text rounded-full p-2 shadow-md"
        >
          <img
            src={isDarkMode ? assets.dropdown_icon_white : assets.dropdown_icon}
            className="-rotate-90"
            alt="Next"
          />
        </button>
      )}

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {displayImages.map((img, index) => (
            <div className="flex-shrink-0 w-full md:w-[500px]" key={index}>
              <img
                src={img.url || assets.no_image_found}
                alt={img.alt || `Image ${index + 1}`}
                className="w-full h-96 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = assets.no_image_found;
                  e.currentTarget.onerror = null;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
