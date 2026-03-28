import { useEffect, useState } from "react";
import api from "../API/api";
import StatCard from "../components/Dashboard/StatCard";
import ListCard from "../components/Dashboard/ListCard";
import ExpenseCard from "../components/Dashboard/ExpenseCard";
import Charts from "../components/Dashboard/Charts";
import KYCVerified from "../components/KYCVerified";
import { useNavigate } from "react-router-dom";






export default function Dashboard() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await api.get("/users/me/");
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };



 

  const fetchDashboardData = async () => {
    try {
      const [tripsRes, destRes, expRes] = await Promise.all([
        api.get("/trips/"),
        api.get("/destinations/"),
        api.get("/expenses/"),
      ]);
      setTrips(tripsRes.data);
      setDestinations(destRes.data);
      setExpenses(expRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
useEffect(() => {
    fetchUser();
    fetchDashboardData();
} ,[]);

 const kycStatus = localStorage.getItem("kyc_status");

    if (kycStatus !== "verified") {
  return (
    <div className="p-4 bg-yellow-100 rounded">
      ⚠️ Your KYC is {kycStatus}
      <br />
      <button onClick={() => navigate("/kyc")}>
        Complete KYC
      </button>
    </div>
  );} 
  return (
    <div className="p-6 space-y-6">
      <KYCVerified user={user} />
      <h1 className="text-3xl font-bold">Travel Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Trips" value={trips.length} />
        <StatCard title="Destinations" value={destinations.length} />
        <StatCard title="Expenses" value={expenses.length} />
      </div>

      {/* Charts */}
      <Charts trips={trips} expenses={expenses} />

      {/* Lists */}
      <div className="grid md:grid-cols-2 gap-6">
        <ListCard title="Trips" data={trips} field="name" />
        <ListCard title="Destinations" data={destinations} field="name" />
      </div>

      {/* Expenses */}
      <ExpenseCard expenses={expenses} />
    </div>

  );
  


}