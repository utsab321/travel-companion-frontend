import { useNavigate } from "react-router-dom";

export default function KYCVerified({ user }) {
  const navigate = useNavigate();

  if (user?.kyc_status !== "verified") {
    return (
      <div className="p-4 bg-yellow-100 rounded flex justify-between items-center">
        ⚠️ Complete KYC to unlock features
        <button
          onClick={() => navigate("/kyc")}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Complete KYC
        </button>
      </div>
    );
  }

  return null;
}