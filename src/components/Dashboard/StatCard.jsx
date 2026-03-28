// src/components/Dashboard/StatCard.jsx
export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow rounded-xl p-6 flex items-center space-x-4">
      {icon && (
        <div className="text-blue-600 text-3xl">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-gray-500 font-medium">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}