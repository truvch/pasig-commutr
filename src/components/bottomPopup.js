
const BottomPopup = ({ station, onClose, className = "" }) => {
    if (!station) return null;
    return (
        <div className={`bg-white rounded-lg p-0 h-full w-full flex flex-col border border-gray-200 shadow-none ${className}`}>
            <div className="flex items-center justify-between border-b px-6 py-4 mb-0">
                <h2 className="text-lg font-semibold">Route Details</h2>
                <button
                    onClick={onClose}
                    className="ml-2 px-2 py-1 rounded hover:bg-gray-200 text-gray-500 text-xl font-bold focus:outline-none"
                    aria-label="Close"
                >
                    ×
                </button>
            </div>
            <div className="text-sm flex-1 px-6 py-4">
                <p className="mb-2"><strong>Station Name:</strong> {station.name}</p>
                <p className="mb-2"><strong>Location:</strong> {station.location ?? 'N/A'}</p>
                <p className="mb-2"><strong>Vehicle Type:</strong> {station.type ?? 'N/A'}</p>
                <p className="mb-2"><strong>Fare:</strong> {station.fare ?? 'N/A'}</p>
                {/* Add other info if needed */}
            </div>
        </div>
    );
};

export default BottomPopup;