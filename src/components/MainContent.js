import MainMap from "./MainMap";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BottomPopup from "./bottomPopup";
import stations from "../data/stations";

function MainContent() {
    const [selectedStation, setSelectedStation] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [preSelectedStation, setPreSelectedStation] = useState(null);
    const clearRouteRef = useRef(null);
    const location = useLocation();

    // Handle URL parameters from Route Archives
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const stationName = urlParams.get('station');
        const masterlocation = urlParams.get('masterlocation');
        
        if (stationName && masterlocation) {
            // Find the station from the data
            const station = stations.find(s => s.name === stationName && s.masterlocation === masterlocation);
            if (station) {
                setPreSelectedStation(station);
                setSelectedStation(station);
                setSelectedRoute({
                    name: station.routeName || station.name || 'Unknown Route',
                    stops: station.stops || [station.name]
                });
            }
        }
    }, [location.search]);

    // Handler to pass to MainMap for station selection
    const handleStationSelect = (station) => {
        setSelectedStation(station);
        // Set selectedRoute based on station info
        if (station) {
            // If station has a route property, use it; otherwise, use station name as route name
            setSelectedRoute({
                name: station.routeName || station.name || 'Unknown Route',
                stops: station.stops || [station.name]
            });
        } else {
            setSelectedRoute(null);
        }
    };

    const handleClosePopup = () => {
        setSelectedStation(null);
        setSelectedRoute(null);
        if (clearRouteRef.current) {
            clearRouteRef.current();
        }
    };

    return (
        <main className="p-3 sm:p-4 md:p-6 min-h-screen">
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 h-full">
                {/* Large Content Area */}
                <div className="lg:col-span-2 order-1 lg:order-none">
                    <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 
                                  h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[600px] 
                                  flex items-center justify-center">
                        <MainMap 
                            onStationSelect={handleStationSelect} 
                            clearRoute={fn => (clearRouteRef.current = fn)} 
                            preSelectedStation={preSelectedStation}
                        />
                    </div>
                </div>

                {/* Sidebar for Route Details */}
                <aside className="w-full lg:w-auto lg:border-l p-4 sm:p-6 bg-gray-50 overflow-y-auto 
                              border-t lg:border-t-0 border-gray-200 lg:border-gray-300
                              min-h-[40vh] lg:min-h-0 order-2 lg:order-none">
                    {selectedStation ? (
                        <BottomPopup 
                            station={selectedStation} 
                            onClose={handleClosePopup} 
                            className="static w-full shadow-none border border-gray-200 h-full" 
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full min-h-[200px]">
                            <p className="text-gray-500 italic text-center px-4">
                                Select a station or search a route to see details here.
                            </p>
                        </div>
                    )}
                </aside>
            </div>
        </main>
    );
}

export default MainContent;