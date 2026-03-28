// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ExploreDestination from "./pages/ExploreDestination";
import TripForm from "./components/Tripform";
import KYCPage from "./pages/KYCPage";
import MyProfile from "./pages/Profile";
// import KYCForm from "./pages/KYCForm";


function App() {
  return (
    <Router>
      < Navbar/>
      <Routes>
        

        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/kyc" element={<KYCPage />} />
        <Route path="/explore" element={<ExploreDestination />} />
        <Route path="/profile" element={<MyProfile/>}/>
        


        <Route path="/create-trip" element={<TripForm />} />
        
      </Routes>
    </Router>
  );
}

export default App;