import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import FileUpload from "./FileUpload";
import { kycApi } from "../API/kycApi";

// ✅ 1. Schema FIRST (must be above component)
const kycSchema = z.object({
  full_name: z.string().min(3, "Full name must be at least 3 characters"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(2, "Nationality is required"),
  id_number: z.string().min(5, "ID number is required"),
  address: z.string().min(10, "Full address is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),

  proof_of_address_type: z.enum([
    "utility_bill",
    "bank_statement",
    "lease_agreement",
    "government_letter",
    "other",
  ]),

  proof_of_address_date: z
    .string()
    .min(1, "Issue date is required")
    .refine((date) => {
      const issueDate = new Date(date);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return issueDate >= threeMonthsAgo;
    }, "Document must be within last 3 months"),
});

export default function KYCForm({ existingKYC, onSuccess }) {
  const [files, setFiles] = useState({
    id_document: null,
    selfie: null,
    proof_of_address: null,
  });

  const [loading, setLoading] = useState(false);

  // ✅ 2. useForm INSIDE component (ONLY ONCE)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(kycSchema),
    defaultValues: existingKYC || {},
  });

  // ✅ 3. submit handler
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (files.id_document) formData.append("id_document", files.id_document);
      if (files.selfie) formData.append("selfie", files.selfie);
      if (files.proof_of_address)
        formData.append("proof_of_address", files.proof_of_address);

      await kycApi.submitKYC(formData);

      alert("KYC submitted successfully!");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow"
    >
      <h2 className="text-2xl font-bold">Complete Your KYC Verification</h2>

      {/* PERSONAL INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input {...register("full_name")} placeholder="Full Name" className="input" />
        <input type="date" {...register("date_of_birth")} className="input" />
        <input {...register("nationality")} placeholder="Nationality" className="input" />
        <input {...register("id_number")} placeholder="ID / Passport Number" className="input" />
      </div>

      {/* ADDRESS */}
      <textarea {...register("address")} placeholder="Full Address" rows={3} className="input" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input {...register("city")} placeholder="City" className="input" />
        <input {...register("country")} placeholder="Country" className="input" />
      </div>

      {/* DOCUMENT TYPE */}
      <select {...register("proof_of_address_type")} className="input">
        <option value="">Select Document Type</option>
        <option value="utility_bill">Utility Bill</option>
        <option value="bank_statement">Bank Statement</option>
        <option value="lease_agreement">Lease Agreement</option>
        <option value="government_letter">Government Letter</option>
        <option value="other">Other</option>
      </select>

      {/* DOCUMENT DATE */}
      <input type="date" {...register("proof_of_address_date")} className="input" />

      {/* FILE UPLOADS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FileUpload
          label="ID Document"
          onFileSelect={(f) =>
            setFiles((prev) => ({ ...prev, id_document: f }))
          }
        />
        <FileUpload
          label="Selfie"
          onFileSelect={(f) =>
            setFiles((prev) => ({ ...prev, selfie: f }))
          }
        />
        <FileUpload
          label="Proof of Address"
          accept="image/*,.pdf"
          onFileSelect={(f) =>
            setFiles((prev) => ({ ...prev, proof_of_address: f }))
          }
        />
      </div>

      {/* ERRORS */}
      <div className="text-red-500 text-sm space-y-1">
        {Object.values(errors).map((err, i) => (
          <p key={i}>{err.message}</p>
        ))}
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit KYC"}
      </button>
    </form>
  );
}