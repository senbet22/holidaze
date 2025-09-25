import { toast } from "react-toastify";
import { assets } from "../../assets/assets.mjs";

/**
 * Button that copies the current page URL to the clipboard.
 *
 * @param {Object} props
 * @param {string} [props.className] - Optional CSS classes for styling.
 */

const ShareButton = ({ className = " cursor-pointer hover:scale-105" }) => {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={className}
      title="Share"
      aria-label="Share this page"
    >
      <img src={assets.share_icon} alt="Share" />
    </button>
  );
};

export default ShareButton;
