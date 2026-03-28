import { useEffect, useState } from 'react';
import KYCForm from '../components/KYCForm';
import KYCStatus from '../components/KYCStatus';
import { kycApi } from '../API/kycApi';

export default function KYCPage() {
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    kycApi.getMyKYC()
      .then(res => setKyc(res.data[0] || null))
      .catch(() => setKyc(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {kyc && kyc.status === 'approved' ? (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-green-600">✅ KYC Verified</h1>
            <p className="mt-4 text-gray-600">You can now access all features.</p>
          </div>
        ) : (
          <>
            {kyc && <KYCStatus kyc={kyc} />}
            <KYCForm existingKYC={kyc} onSuccess={() => window.location.reload()} />
          </>
        )}
      </div>
    </div>
  );
}