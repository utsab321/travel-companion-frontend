// src/components/CityDropdown.jsx
import { useEffect, useState } from "react";

function Dropdown({ value, onChange }) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/cities/")  // Your Django API
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select a city</option>
      {cities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;