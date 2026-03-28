// src/components/TripForm.jsx
import { useState } from "react";
import CityDropdown from "./Dropdown";

function TripForm() {
  const [cityId, setCityId] = useState(""); // selected city
  const [title, setTitle] = useState("");
  const [destinationId] = useState(""); // if needed

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to Django API
    fetch("http://localhost:8000/api/trips/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, city: cityId, destination: destinationId }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>City:</label>
      <CityDropdown value={cityId} onChange={setCityId} />

      {/* Optional: Destination dropdown can be added here based on selected city */}

      <button type="submit">Create Trip</button>
    </form>
  );
}

export default TripForm;