import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock, Star, Eye, ChevronDown, ChevronRight } from 'lucide-react';
import API_BASE_URL from '../config/api.js';
import jeepIconImg from '../assets/jeepney.png';
import uvIconImg from '../assets/uvexpress.png';

function RouteArchives() {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedGroups, setExpandedGroups] = useState({});
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    const groupedStations = useMemo(() => {
        if (!stations.length) return {};
        
        const filtered = stations.filter(station => 
            station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            station.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            station.masterlocation.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return filtered.reduce((groups, station) => {
            const key = station.masterlocation;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(station);
            return groups;
        }, {});
    }, [searchTerm, stations]);

    const toggleGroup = (groupName) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }));
    };

    const handleShowOnMap = (station) => {
        const params = new URLSearchParams({
            station: station.name,
            lat: station.positionstart[0],
            lng: station.positionstart[1],
            masterlocation: station.masterlocation
        });
        navigate(`/?${params.toString()}`);
    };

    const getTransportBadge = (typeid) => {
        if (typeid === 'jeep') {
            return (
                <span className="bg-accent-100 text-accent-800 text-xs px-3 py-1.5 rounded-full flex items-center font-medium">
                    <img src={jeepIconImg} alt="Jeepney" className="w-3 h-3 mr-1" />
                    Jeepney
                </span>
            );
        } else if (typeid === 'uvexpress') {
            return (
                <span className="bg-primary-100 text-primary-800 text-xs px-3 py-1.5 rounded-full flex items-center font-medium">
                    <img src={uvIconImg} alt="UV Express" className="w-3 h-3 mr-1" />
                    UV Express
                </span>
            );
        }
        return <span className="bg-neutral-100 text-neutral-800 text-xs px-3 py-1.5 rounded-full font-medium">Transport</span>;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center space-y-4">
                        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
                        <p className="text-neutral-600">Loading route archives...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
            <div className="container mx-auto px-4 py-6 max-w-6xl">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg mb-4">
                        <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">Route Archives</h1>
                    <p className="text-neutral-600 max-w-2xl mx-auto">
                        Browse all available routes in Pasig. Find your destination and view it on the interactive map.
                    </p>
                </div>
                <div className="mb-8">
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search routes, locations, or landmarks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-neutral-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200 bg-white shadow-sm"
                        />
                    </div>
                </div>

                <div className="mb-6 text-center">
                    <p className="text-neutral-600">
                        <span className="font-semibold">{Object.keys(groupedStations).length}</span> location{Object.keys(groupedStations).length !== 1 ? 's' : ''} found
                        {searchTerm && (
                            <span> for "<span className="font-medium text-primary-600">{searchTerm}</span>"</span>
                        )}
                    </p>
                </div>

                <div className="space-y-4">
                    {Object.keys(groupedStations).length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-neutral-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-neutral-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-800 mb-2">No Routes Found</h3>
                            <p className="text-neutral-600">Try adjusting your search terms or browse all locations.</p>
                        </div>
                    ) : (
                        Object.entries(groupedStations).map(([groupName, groupStations]) => (
                            <div key={groupName} className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                                <button
                                    onClick={() => toggleGroup(groupName)}
                                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-neutral-50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-primary-600" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-bold text-neutral-900 text-lg">{groupName}</h3>
                                            <p className="text-sm text-neutral-600 flex items-center space-x-1">
                                                <span>{groupStations.length} route{groupStations.length !== 1 ? 's' : ''}</span>
                                                <span>•</span>
                                                <span className="flex items-center space-x-1">
                                                    <Star className="w-3 h-3 text-accent-500" />
                                                    <span>Popular area</span>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-neutral-400">
                                        {expandedGroups[groupName] ? 
                                            <ChevronDown className="w-5 h-5" /> : 
                                            <ChevronRight className="w-5 h-5" />
                                        }
                                    </div>
                                </button>

                                {expandedGroups[groupName] && (
                                    <div className="border-t border-neutral-200 bg-neutral-50">
                                        <div className="p-6 space-y-4">
                                            {groupStations.map((station, index) => (
                                                <div key={index} className="bg-white rounded-xl p-4 border border-neutral-200 hover:shadow-md transition-shadow">
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center space-x-3 mb-3">
                                                                <div className="text-2xl">
                                                                    {station.typeid === 'jeep' ? '🚌' : station.typeid === 'uvexpress' ? '🚐' : '🚌'}
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-semibold text-neutral-900 text-lg">
                                                                        {station.name}
                                                                    </h4>
                                                                    <p className="text-neutral-600 text-sm">
                                                                        {station.location}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3 flex-wrap">
                                                                {getTransportBadge(station.typeid)}
                                                                {station.fare && (
                                                                    <span className="bg-accent-100 text-accent-800 text-xs px-3 py-1.5 rounded-full font-medium flex items-center space-x-1">
                                                                        <span>₱{station.fare}</span>
                                                                    </span>
                                                                )}
                                                                <span className="bg-neutral-100 text-neutral-700 text-xs px-3 py-1.5 rounded-full font-medium flex items-center space-x-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    <span>5AM - 10PM</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <button
                                                                onClick={() => handleShowOnMap(station)}
                                                                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-sm space-x-2"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                                <span>View on Map</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-12 bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                    <h3 className="font-bold text-neutral-900 mb-4 text-center">Route Summary</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <img src={jeepIconImg} alt="Jeepney" className="w-8 h-8" />
                            </div>
                            <div className="text-2xl font-bold text-accent-600">
                                {stations.filter(s => s.typeid === 'jeep').length}
                            </div>
                            <p className="text-neutral-600 text-sm">Jeepney Routes</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <img src={uvIconImg} alt="UV Express" className="w-8 h-8" />
                            </div>
                            <div className="text-2xl font-bold text-primary-600">
                                {stations.filter(s => s.typeid === 'uvexpress').length}
                            </div>
                            <p className="text-neutral-600 text-sm">UV Express Routes</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <MapPin className="w-8 h-8 text-neutral-600" />
                            </div>
                            <div className="text-2xl font-bold text-neutral-700">
                                {Object.keys(groupedStations).length}
                            </div>
                            <p className="text-neutral-600 text-sm">Locations</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RouteArchives;
