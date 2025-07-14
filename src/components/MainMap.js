import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { useState, useEffect, useRef } from 'react';
import polyline from '@mapbox/polyline';
import L from 'leaflet';
import jeepIconImg from '../assets/jeepney.png';
import uvIconImg from '../assets/uvexpress.png';

const jeepIcon = new L.Icon({
    iconUrl: jeepIconImg,
    iconSize: [48, 48],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});
const uvIcon = new L.Icon({
    iconUrl: uvIconImg,
    iconSize: [48, 48],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

function getIconByType(typeid) {
    if (typeid === 'jeep') return jeepIcon;
    if (typeid === 'uvexpress') return uvIcon;
    return undefined;
}

const initialMapPosition = [14.558841468571385, 121.08326037851103]; 

// Create custom icons for start and end markers
const startIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="green">
            <circle cx="12" cy="12" r="8"/>
            <text x="12" y="16" text-anchor="middle" fill="white" font-size="10" font-weight="bold">S</text>
        </svg>
    `),
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
});

const endIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red">
            <circle cx="12" cy="12" r="8"/>
            <text x="12" y="16" text-anchor="middle" fill="white" font-size="10" font-weight="bold">E</text>
        </svg>
    `),
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
});

// Show route + zoom
function RouteViewer({ path, start, end }) {
    const map = useMap();

    useEffect(() => {
        if (path && path.length > 0) {
            map.fitBounds(path);
        }
    }, [path, map]);

    return (
        <>
            <Polyline key="route" positions={path} color="blue" weight={4} />
        </>
    );
}

// Component to handle map resetting when no route is selected
function MapResetter({ selectedRoute, initialPosition, initialZoom }) {
    const map = useMap();
    useEffect(() => {
        if (!selectedRoute) {
            map.setView(initialPosition, initialZoom);
        }
    }, [selectedRoute, map, initialPosition, initialZoom]);
    return null;
}


function MainMap({ onStationSelect, clearRoute, preSelectedStation }) {
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const markerRefs = useRef({});

    // Fetch stations data from API
    useEffect(() => {
        setLoading(true);
        setError(null);
        
        fetch("http://localhost:3001/get-stations")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((result) => {
                if (result.success && Array.isArray(result.data)) {
                    console.log('Stations loaded:', result.data.length);
                    setStations(result.data);
                } else {
                    console.error('Invalid response format:', result);
                    setError('Invalid data format received from server');
                }
            })
            .catch((error) => {
                console.error("Error fetching stations:", error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Handle pre-selected station from URL params
    useEffect(() => {
        if (preSelectedStation && stations.length > 0) {
            const station = stations.find(s => 
                s.name === preSelectedStation.name && 
                s.masterlocation === preSelectedStation.masterlocation
            );
            if (station) {
                handleMarkerClick(station, stations.indexOf(station));
            }
        }
    }, [preSelectedStation, stations]);

    // Expose a way for parent to clear the route
    useEffect(() => {
        if (typeof clearRoute === 'function') {
            clearRoute(() => setSelectedRoute(null));
        }
    }, [clearRoute]);

    const handleMarkerClick = (station, index) => {
        // Add safety checks for station data
        if (!station.encpoly || !station.positionstart || !station.positionend) {
            console.warn('Incomplete station data:', station);
            return;
        }
        
        // Validate coordinates
        if (!Array.isArray(station.positionstart) || station.positionstart.length !== 2 ||
            !Array.isArray(station.positionend) || station.positionend.length !== 2) {
            console.warn('Invalid coordinate data:', station);
            return;
        }
        
        try {
            let path = polyline.decode(station.encpoly);
            path = path.map(([lat, lng]) => [lat, lng]);
            setSelectedRoute({
                path,
                start: station.positionstart,
                end: station.positionend,
            });
            if (onStationSelect) {
                onStationSelect(station);
            }
        } catch (error) {
            console.error('Error decoding polyline for station:', station.name, error);
        }
    };

    return (
        <div className="relative w-full h-full flex-1 flex">
            {loading && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-2.5 rounded shadow-lg">
                    Loading stations...
                </div>
            )}
            {error && (
                <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white p-2.5 rounded shadow-lg">
                    Error: {error}
                </div>
            )}
            <MapContainer
                center={initialMapPosition}
                zoom={17}
                scrollWheelZoom={true}
                className="flex-1 w-full z-0"
                style={{ width: '100%', flex: 1 }}
            >
                <MapResetter selectedRoute={selectedRoute} initialPosition={initialMapPosition} initialZoom={17} />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {!selectedRoute && stations && stations.length > 0 && stations.map((station, index) => {
                    // Ensure station has required properties and valid coordinates
                    if (!station.positionstart || 
                        !Array.isArray(station.positionstart) || 
                        station.positionstart.length !== 2 ||
                        station.positionstart[0] == null || 
                        station.positionstart[1] == null ||
                        isNaN(station.positionstart[0]) || 
                        isNaN(station.positionstart[1])) {
                        console.warn('Invalid station position:', station);
                        return null;
                    }
                    
                    return (
                        <Marker
                            key={station.id || index}
                            position={station.positionstart}
                            ref={(ref) => (markerRefs.current[index] = ref)}
                            icon={getIconByType(station.typeid)}
                            zIndexOffset={500}
                            eventHandlers={{
                                click: () => handleMarkerClick(station, index),
                            }}
                        >
                        </Marker>
                    );
                })}

                {selectedRoute && (
                    <RouteViewer
                        path={selectedRoute.path}
                        start={selectedRoute.start}
                        end={selectedRoute.end}
                    />
                )}
            </MapContainer>
        </div>
    );
}

export default MainMap;