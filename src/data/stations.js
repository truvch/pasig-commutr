import React from 'react';
import API_BASE_URL from '../config/api.js';

const Stations = () => {
  const [stationsData, setStationsData] = React.useState([]);

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/get-stations`)
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setStationsData(result.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
      });
  }, []);

  return (
    <div>
      <h1>Stations List</h1>
      <ul>
        {stationsData.map((station, index) => (
          <li key={index}>
            <strong>{station.name}</strong> - {station.masterlocation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stations;
