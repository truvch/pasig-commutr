
import { X, MapPin, DollarSign, Car, Clock, Info } from 'lucide-react';

const BottomPopup = ({ station, onClose, className = "" }) => {
    if (!station) return null;
    
    const getVehicleIcon = (type) => {
        switch (type?.toLowerCase()) {
            case 'jeepney':
                return '🚌';
            case 'uv express':
                return '🚐';
            case 'tricycle':
                return '🛺';
            default:
                return '🚌';
        }
    };

    return (
        <div className={`bg-white rounded-2xl h-full w-full flex flex-col overflow-hidden ${className}`}>
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Station Details</h2>
                            <p className="text-white/80 text-sm">Route Information</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                {/* Station Name Card */}
                <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-4 border border-neutral-200">
                    <div className="flex items-center space-x-3">
                        <div className="text-2xl">{getVehicleIcon(station.type)}</div>
                        <div>
                            <h3 className="text-xl font-bold text-neutral-800">{station.name}</h3>
                            <p className="text-neutral-600 text-sm">{station.location || 'Location not specified'}</p>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Vehicle Type */}
                    <div className="bg-white border border-neutral-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                <Car className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500 font-medium">Vehicle Type</p>
                                <p className="text-neutral-800 font-semibold">{station.type || 'Not specified'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Fare */}
                    <div className="bg-white border border-neutral-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-accent-600" />
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500 font-medium">Fare</p>
                                <p className="text-neutral-800 font-semibold">{station.fare ? `₱${station.fare}` : 'Contact driver'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Operating Hours */}
                    <div className="bg-white border border-neutral-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500 font-medium">Operating Hours</p>
                                <p className="text-neutral-800 font-semibold">{station.hours || '5:00 AM - 10:00 PM'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-white border border-neutral-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                                <Info className="w-5 h-5 text-accent-600" />
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500 font-medium">Status</p>
                                <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-accent-500 rounded-full"></span>
                                    <p className="text-neutral-800 font-semibold">Active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Route Information */}
                {station.route && (
                    <div className="bg-white border border-neutral-200 rounded-xl p-4">
                        <h4 className="font-semibold text-neutral-800 mb-3 flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-primary-600" />
                            <span>Route Information</span>
                        </h4>
                        <p className="text-neutral-600 text-sm">{station.route}</p>
                    </div>
                )}

                {/* Help Text */}
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
                    <p className="text-primary-700 text-sm">
                        💡 <strong>Tip:</strong> Fares may vary depending on distance and time of day. Always confirm with the driver before boarding.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BottomPopup;