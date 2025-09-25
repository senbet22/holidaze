/**
 * VenueFacilitiesForm component
 *
 * A dynamic checkbox form for editing venue facilities.
 *
 * Props:
 * @param {Object} meta - Current facilities state (e.g., { wifi: true, parking: false }).
 * @param {Function} setMeta - Setter function to update facilities state.
 *
 * Features:
 * - Renders a checkbox for each facility in `meta`.
 * - Toggles the value of each facility when clicked.
 * - Styled grid layout with rounded container and spacing.
 *
 * @returns {JSX.Element} Form UI for venue facilities input.
 */

const VenueFacilitiesForm = ({ meta, setMeta }) => {
  const handleCheckboxChange = (key) => {
    setMeta({ ...meta, [key]: !meta[key] });
  };

  return (
    <div className="space-y-3 bg-accent/20 p-1 py-2 rounded-md">
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(meta).map(([facility, value]) => (
          <label
            key={facility}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={value}
              onChange={() => handleCheckboxChange(facility)}
              className="w-4 h-4"
            />
            <span className="text-sm capitalize">{facility}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default VenueFacilitiesForm;
