import MainMap from "../components/MainMap.js";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import API_BASE_URL from '../config/api.js';
import BottomPopup from "../components/bottomPopup.js";

function Home() {
    const [selectedStation, setSelectedStation] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [preSelectedStation, setPreSelectedStation] = useState(null);
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const clearRouteRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        fetch(`${API_BASE_URL}/get-stations`)
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    setStations(result.data);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching stations:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (loading || stations.length === 0) return;
        
        const urlParams = new URLSearchParams(location.search);
        const stationName = urlParams.get('station');
        const masterlocation = urlParams.get('masterlocation');
        
        if (stationName && masterlocation) {
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

    }, [location.search, stations, loading]);

    const handleStationSelect = (station) => {
        setSelectedStation(station);
        if (station) {
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

    if (loading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center space-y-4">
                        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
                        <p className="text-neutral-600">Loading routes...</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
            <div className="container mx-auto px-4 py-6">
                <div className="grid lg:grid-cols-3 gap-6 h-full">
                    <div className="lg:col-span-2 order-1 lg:order-none">
                        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 
                                      h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[600px] 
                                      overflow-hidden relative group">
                            <div className="absolute top-4 right-4 z-10">
                                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm border border-white/20">
                                    <p className="text-sm text-neutral-600">Click any station for details</p>
                                </div>
                            </div>
                            
                            <MainMap 
                                onStationSelect={handleStationSelect} 
                                clearRoute={fn => (clearRouteRef.current = fn)} 
                                preSelectedStation={preSelectedStation}
                            />
                        </div>
                    </div>

                    <aside className="lg:h-[600px] order-2 lg:order-none">
                        <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 h-full overflow-hidden">
                            {selectedStation ? (
                                <div className="h-full animate-fade-in">
                                    <BottomPopup 
                                        station={selectedStation} 
                                        onClose={handleClosePopup} 
                                        className="static w-full shadow-none border-0 h-full rounded-2xl" 
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl flex items-center justify-center">
                                        <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold text-neutral-800">Welcome to PasigCommutr</h3>
                                        <p className="text-neutral-600 text-sm leading-relaxed max-w-xs">
                                            Click on any station marker on the map to view detailed route information, fares, and schedules.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2 text-xs text-neutral-500 bg-neutral-50 px-3 py-2 rounded-lg">
                                            <span>💡</span>
                                            <span>Need help finding routes? Visit our Route Archives</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-xs text-neutral-500 bg-accent-50 px-3 py-2 rounded-lg">
                                            <span>🚌</span>
                                            <span>Support local transport by contributing new routes</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

export default Home;
