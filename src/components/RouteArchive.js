import stations from "../data/stations";

const RouteArchive = (station) => {
    return (
         <div className="text-sm flex-1">
            <p><strong>Location:</strong> {station.location ?? 'N/A'}</p>
        </div>
    )
}

export default RouteArchive;