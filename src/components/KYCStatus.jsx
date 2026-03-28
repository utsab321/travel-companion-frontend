export default function KYCStatus({ kyc }) {
  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-800',
    under_review: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">KYC Status</h3>
        <span className={`px-4 py-1 rounded-full text-sm font-medium ${statusColor[kyc.status]}`}>
          {kyc.status.toUpperCase().replace('_', ' ')}
        </span>
      </div>

      {kyc.notes && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="font-medium">Admin Note:</p>
          <p>{kyc.notes}</p>
        </div>
      )}
    </div>
  );
}