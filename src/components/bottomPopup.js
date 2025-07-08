
const BottomPopup = ({ station, onClose, className = "" }) => {
    if (!station) return null;

    return (
        <div className={`bg-white shadow-lg rounded-lg p-6 h-full w-full flex flex-col z-[1000] ${className}`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">{station.name}</h2>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
            <div className="text-sm flex-1">
                <p><strong>Location:</strong> {station.location ?? 'N/A'}</p>
                <p><strong>Vehicle Type:</strong> {station.type ?? 'N/A'}</p>
                <p><strong>Fare:</strong> {station.fare ?? 'N/A'}</p>
                {/* Add other info if needed */}
            </div>
        </div>
    );
};

export default BottomPopup;