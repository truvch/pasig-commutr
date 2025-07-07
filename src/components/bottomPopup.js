const BottomPopup = ({ station, onClose }) => {
    if (!station) return null;

    return (
        <div className="absolute bottom-4 left-4 bg-white shadow-lg rounded-lg p-4 w-80 z-[1000]">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">{station.name}</h2>
                <button
                    className="text-red-500 hover:text-red-700"
                    onClick={onClose}
                >
                    ✕
                </button>
            </div>
            <div className="text-sm">
                <p><strong>Vehicle Type:</strong> {station.type ?? 'N/A'}</p>
                <p><strong>Fare:</strong> {station.fare ?? 'N/A'}</p>
                {/* Add other info if needed */}
            </div>
        </div>
    );
};

export default BottomPopup;