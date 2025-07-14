import React from 'react';

const Stations = () => {
  const [stationsData, setStationsData] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3001/get-stations")
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
