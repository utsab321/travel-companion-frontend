import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

export default function TripDetail() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    API.get(`trips/${id}/`)
      .then(res => setTrip(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!trip) return <p>Loading...</p>;

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold">{trip.title}</h1>

        <p className="text-gray-500">
          {trip.destination.name}, {trip.destination.country}
        </p>

        <p className="mt-2">
          {trip.start_date} → {trip.end_date}
        </p>

        <p className="mt-4">{trip.description}</p>

        <h2 className="mt-6 text-xl font-bold">Itinerary</h2>

        {trip.itinerary.map(item => (
          <div key={item.id} className="p-3 border rounded mt-2">
            <strong>Day {item.day}:</strong> {item.activity}
          </div>
        ))}
      </div>
    </div>
  );
}