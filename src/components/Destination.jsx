// components/Destination.jsx
import React from 'react';

export default function Destination({ place }) {
  const { name, image, description, rating = 0 } = place;

  return (
    <div className="destination-card">
      <img src={image || '/placeholder-destination.jpg'} alt={name} />
      <div className="destination-info">
        <h4>{name}</h4>
        {rating > 0 && <div className="rating">★ {rating.toFixed(1)}</div>}
        <p>{description?.substring(0, 90)}{description?.length > 90 ? '...' : ''}</p>
      </div>
    </div>
  );
}