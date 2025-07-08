import MainMap from "./MainMap";
import { useState, useRef } from "react";
import BottomPopup from "./bottomPopup";

function MainContent() {
    const [selectedStation, setSelectedStation] = useState(null);
    const clearRouteRef = useRef(null);

    // Handler to pass to MainMap for station selection
    const handleStationSelect = (station) => {
        setSelectedStation(station);
    };

    const handleClosePopup = () => {
        setSelectedStation(null);
        if (clearRouteRef.current) {
            clearRouteRef.current();
        }
    };

    return (
        <main className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Large Content Area */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 h-[600px] flex items-center justify-center">
                        <MainMap onStationSelect={handleStationSelect} clearRoute={fn => (clearRouteRef.current = fn)} />
                    </div>
                </div>
 
                <div className="lg:col-span-1 flex flex-col h-[600px] gap-4">
                    {/* Top half */}
                    <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 flex-1 flex flex-col items-center justify-center">
                        {selectedStation ? (
                            <BottomPopup 
                                station={selectedStation} 
                                onClose={handleClosePopup} 
                                className="static w-full shadow-none border border-gray-200" 
                            />
                        ) : (
                            <div className="text-center text-gray-400">
                                Route details will show here
                            </div>
                        )}
                    </div>
                    {/* Bottom half */}
                    <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 flex-1 flex flex-col items-center justify-center">
                        {/* Add second sidebar component here */}
                        <div className="text-center text-gray-400">Sidebar bottom section</div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MainContent;