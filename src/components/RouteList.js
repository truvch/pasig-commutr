import React from 'react';
import stations from '../data/stations';

function RouteList({ onSelect }) {
    return (
        <div style={{
            position: 'absolute',
            top: '80px',
            right: '40px',
            width: '260px',
            minHeight: '300px',
            background: 'rgba(255,255,255,0.95)',
            border: '1px solid #888',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            zIndex: 1000,
            padding: '20px',
        }}>
            <h3 style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: '18px' }}>List of Routes:</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {stations.map((station, idx) => (
                    <li key={idx} style={{ marginBottom: '12px' }}>
                        <button
                            style={{
                                width: '100%',
                                background: '#2196f3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '8px 12px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '15px',
                            }}
                            onClick={() => onSelect(station, idx)}
                        >
                            {station.name || `Route ${idx + 1}`}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RouteList;
