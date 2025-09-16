const VenueFeatures = ({ meta, isDarkMode, assets }) => {
  if (!meta) return null;

  const features = [
    {
      key: "wifi",
      label: "WiFi",
      icon: assets.wifi_icon,
      iconDark: assets.wifi_icon_white,
    },
    {
      key: "parking",
      label: "Parking",
      icon: assets.parking_icon,
      iconDark: assets.parking_icon_white,
    },
    {
      key: "breakfast",
      label: "Breakfast",
      icon: assets.breakfast_icon,
      iconDark: assets.breakfast_icon_white,
    },
    {
      key: "pets",
      label: "Pet friendly",
      icon: assets.pets_icon,
      iconDark: assets.pets_icon_white,
    },
  ];

  // Filter available features
  const availableFeatures = features.filter((feature) => meta[feature.key]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Features</h2>
      {availableFeatures.length > 0 ? (
        <div className="grid grid-cols-2 gap-2">
          {availableFeatures.map((feature) => (
            <div key={feature.key} className="flex items-center">
              <img
                src={isDarkMode ? feature.iconDark : feature.icon}
                alt={`${feature.label} Icon`}
                className="mr-2"
              />
              <span>{feature.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-text">No available features on this venue</p>
      )}
    </div>
  );
};

export default VenueFeatures;
