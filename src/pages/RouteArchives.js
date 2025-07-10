import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import stations from '../data/stations';
import jeepIconImg from '../assets/jeepney.png';
import uvIconImg from '../assets/uvexpress.png';

function RouteArchives() {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedGroups, setExpandedGroups] = useState({});
    const navigate = useNavigate();

    // Group stations by masterlocation
    const groupedStations = useMemo(() => {
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
    }, [searchTerm]);

    const toggleGroup = (groupName) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }));
    };

    const handleShowOnMap = (station) => {
        // Navigate to home page with station data as URL params
        const params = new URLSearchParams({
            station: station.name,
            lat: station.positionstart[0],
            lng: station.positionstart[1],
            masterlocation: station.masterlocation
        });
        navigate(`/?${params.toString()}`);
    };

    const getTransportIcon = (typeid) => {
        if (typeid === 'jeep') {
            return <img src={jeepIconImg} alt="Jeepney" className="inline-block w-5 h-5 mr-2" />;
        } else if (typeid === 'uvexpress') {
            return <img src={uvIconImg} alt="UV Express" className="inline-block w-5 h-5 mr-2" />;
        }
        return <span className="inline-block w-3 h-3 bg-gray-500 rounded-full mr-2"></span>;
    };

    const getTransportBadge = (typeid) => {
        if (typeid === 'jeep') {
            return (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <img src={jeepIconImg} alt="Jeepney" className="w-3 h-3 mr-1" />
                    Jeepney
                </span>
            );
        } else if (typeid === 'uvexpress') {
            return (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <img src={uvIconImg} alt="UV Express" className="w-3 h-3 mr-1" />
                    UV Express
                </span>
            );
        }
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Transport</span>;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-6 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Route Archives</h1>
                    <p className="text-gray-600">Browse all transport routes grouped by location</p>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search routes, locations, or landmarks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Results Info */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        {Object.keys(groupedStations).length} location{Object.keys(groupedStations).length !== 1 ? 's' : ''} found
                        {searchTerm && ` for "${searchTerm}"`}
                    </p>
                </div>

                {/* Grouped Stations */}
                <div className="space-y-4">
                    {Object.keys(groupedStations).length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4 text-gray-400">No Results</div>
                            <p className="text-gray-600">No routes found matching your search.</p>
                        </div>
                    ) : (
                        Object.entries(groupedStations).map(([groupName, groupStations]) => (
                            <div key={groupName} className="bg-white rounded-lg shadow-sm border border-gray-200">
                                {/* Group Header */}
                                <button
                                    onClick={() => toggleGroup(groupName)}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center">
                                        <span className="text-gray-500 mr-3 font-medium">•</span>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">{groupName}</h3>
                                            <p className="text-sm text-gray-600">
                                                {groupStations.length} route{groupStations.length !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-gray-400 text-lg">
                                        {expandedGroups[groupName] ? '▲' : '▼'}
                                    </span>
                                </button>

                                {/* Group Content */}
                                <div className={`transition-all duration-200 ease-in-out ${
                                    expandedGroups[groupName] ? 'max-h-none opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                }`}>
                                    <div className="border-t border-gray-200">
                                        {groupStations.map((station, index) => (
                                            <div key={index} className="px-6 py-4 border-b border-gray-100 last:border-b-0">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center mb-2">
                                                            {getTransportIcon(station.typeid)}
                                                            <h4 className="font-medium text-gray-900 truncate">
                                                                Route: {station.name}
                                                            </h4>
                                                        </div>
                                                        <div className="flex items-start text-sm text-gray-600 mb-2">
                                                            <span className="mr-1 mt-0.5 font-medium">•</span>
                                                            <span className="break-words">
                                                                Location: {station.location}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            {getTransportBadge(station.typeid)}
                                                            {station.fare && (
                                                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                                                    Fare: {station.fare}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <button
                                                            onClick={() => handleShowOnMap(station)}
                                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                                        >
                                                            Show on Map
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Summary */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Route Summary</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center">
                            <img src={jeepIconImg} alt="Jeepney" className="w-4 h-4 mr-2" />
                            <span className="text-blue-800">
                                {stations.filter(s => s.typeid === 'jeep').length} Jeepney routes
                            </span>
                        </div>
                        <div className="flex items-center">
                            <img src={uvIconImg} alt="UV Express" className="w-4 h-4 mr-2" />
                            <span className="text-blue-800">
                                {stations.filter(s => s.typeid === 'uvexpress').length} UV Express routes
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-blue-700 mr-2 font-medium">•</span>
                            <span className="text-blue-800">
                                {Object.keys(groupedStations).length} locations
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RouteArchives;
