// src/components/Dashboard/ListCard.jsx
export default function ListCard({ title, data, field }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="divide-y divide-gray-200">
        {data.map((item) => (
          <li key={item.id} className="py-2">
            {item[field]}
          </li>
        ))}
      </ul>
    </div>
  );
}