import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Charts({ trips, expenses }) {
  const tripsChart = {
    labels: trips.map((t) => t.name),
    datasets: [
      {
        label: "Expenses per Trip",
        data: trips.map((t) => t.total_expense || 0),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow my-6">
      <h2 className="text-xl font-semibold mb-3">Expenses per Trip</h2>
      <Bar data={tripsChart} />
    </div>
  );
}