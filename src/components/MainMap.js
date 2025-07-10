import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { useState, useEffect, useRef } from 'react';
import polyline from '@mapbox/polyline';
import stations from '../data/stations';
import L from 'leaflet';
import jeepIconImg from '../assets/jeepney.png';
import uvIconImg from '../assets/uvexpress.png';

// Define custom icons
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

const initialMapPosition = [14.558841468571385, 121.08326037851103]; // Renamed for clarity

// Show route + markers + zoom
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
            <Marker key="start-marker" position={start}></Marker>
            <Marker key="end-marker" position={end}></Marker>
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
    const markerRefs = useRef({});

    // Handle pre-selected station from URL params
    useEffect(() => {
        if (preSelectedStation) {
            const station = stations.find(s => 
                s.name === preSelectedStation.name && 
                s.masterlocation === preSelectedStation.masterlocation
            );
            if (station) {
                handleMarkerClick(station, stations.indexOf(station));
            }
        }
    }, [preSelectedStation]);

    // Expose a way for parent to clear the route
    useEffect(() => {
        if (typeof clearRoute === 'function') {
            clearRoute(() => setSelectedRoute(null));
        }
    }, [clearRoute]);

    const handleMarkerClick = (station, index) => {
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
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', flex: 1, display: 'flex' }}>
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

                {stations.map((station, index) => (
                    <Marker
                        key={index}
                        position={station.positionstart}
                        ref={(ref) => (markerRefs.current[index] = ref)}
                        icon={getIconByType(station.typeid)}
                        eventHandlers={{
                            click: () => handleMarkerClick(station, index),
                        }}
                    >
                    </Marker>
                ))}

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