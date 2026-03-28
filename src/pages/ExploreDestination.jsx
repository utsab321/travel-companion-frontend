import { useState } from "react";
import "./ExploreDestination.css";

const destinationsData = [
  {
    id: 1,
    name: "Pokhara",
    description: "City of lakes & gateway to Annapurna",
    image: "https://www.holidify.com/images/cmsuploads/compressed/17385207255_329304a603_k_20180928212413_20180928212429.jpg",
  },
  {
    id: 2,
    name: "Kathmandu",
    description: "Capital city with heritage sites",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Swayambhunath_2018.jpg/1280px-Swayambhunath_2018.jpg",
  },
  {
    id: 3,
    name: "Chitwan",
    description: "Famous for jungle safari & wildlife",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmanasluguide.com%2Fwp-content%2Fuploads%2F2022%2F12%2Fchitwan-national-park.jpg&f=1&nofb=1&ipt=89e9081e88e0a5905a94b1e666f247bb1bf230ade18dc514b86d33cf523611a4",
  },
  {
    id: 4,
    name: "Lumbini",
    description: "Birthplace of Lord Buddha",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.purevacations.com%2Fwp-content%2Fuploads%2F2023%2F05%2FWorld-Peace-Stupa-in-Lumbini-1024x683.jpg&f=1&nofb=1&ipt=9afd2a93836ae8937f1c24d9718767440a7ce8efeaec1d80c0c956d76ad72944",
  },
  {
    id: 5,
    name: "Mustang",
    description: "Desert-like mountain region",
    image: "https://source.unsplash.com/400x300/?mustang-nepal",
  },
  {
    id: 6,
    name: "Everest Base Camp",
    description: "World’s highest trekking destination",
    image: "https://source.unsplash.com/400x300/?everest",
  },
];

function ExploreDestination() {
  const [search, setSearch] = useState("");

  const filtered = destinationsData.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="explore">
      <h2>🇳🇵 Explore Nepal</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search places in Nepal..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      {/* Grid */}
      <div className="grid">
        {filtered.map((dest) => (
          <div className="card" key={dest.id}>
            <img src={dest.image} alt={dest.name} />

            <div className="card-body">
              <h3>{dest.name}</h3>
              <p>{dest.description}</p>

              <button className="explore-btn">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreDestination;