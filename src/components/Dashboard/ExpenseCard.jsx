
export default function ExpenseCard({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Expenses</h3>
      <p className="text-gray-700 font-medium mb-2">Total: {total}</p>
      <ul className="divide-y divide-gray-200">
        {expenses.map((exp) => (
          <li key={exp.id} className="py-2 flex justify-between">
            <span>{exp.title}</span>
            <span className="font-medium">{exp.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}