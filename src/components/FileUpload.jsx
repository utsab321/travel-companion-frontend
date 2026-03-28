import { useState } from 'react';

export default function FileUpload({ label, onFileSelect, previewUrl, accept = "image/*,.pdf" }) {
  const [preview, setPreview] = useState(previewUrl);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          id={label}
        />
        <label htmlFor={label} className="cursor-pointer">
          {preview ? (
            <img src={preview} alt="preview" className="mx-auto h-32 object-contain" />
          ) : (
            <div className="text-gray-500">
              <span className="block text-4xl mb-2">📎</span>
              <span>Click to upload or drag & drop</span>
            </div>
          )}
        </label>
      </div>
      <p className="text-xs text-gray-500">Supported: JPG, PNG, PDF (max 5MB)</p>
    </div>
  );
}