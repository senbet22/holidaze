const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, venueName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-secondary rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold text-text mb-4">Are you sure?</h2>
        <p className="text-text/70 mb-6">
          You are about to delete{" "}
          <span className="font-medium text-text">{venueName}</span>. This
          action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded- cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg cursor-pointer bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
