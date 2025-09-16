const VenueLocationForm = ({ location, setLocation }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value });
  };

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Location</h3>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          name="address"
          value={location.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          value={location.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="zip"
          value={location.zip}
          onChange={handleChange}
          placeholder="ZIP Code"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="country"
          value={location.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="continent"
          value={location.continent}
          onChange={handleChange}
          placeholder="Continent"
          className="w-full p-2 border rounded"
        />
        <div></div>
        <input
          type="number"
          name="lat"
          value={location.lat}
          onChange={handleChange}
          placeholder="Latitude"
          step="any"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="lng"
          value={location.lng}
          onChange={handleChange}
          placeholder="Longitude"
          step="any"
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default VenueLocationForm;
