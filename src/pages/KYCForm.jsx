// // KYCForm.jsx
// import { useState } from "react";
// import axios from "axios";

// export default function KYCForm() {
//   const [form, setForm] = useState({
//     full_name: "",
//     date_of_birth: "",
//     document_type: "",
//     document_number: "",
//     document_image: null,
//     selfie_image: null,
//   });

//   const handleChange = (e) => {
//     if (e.target.files) {
//       setForm({ ...form, [e.target.name]: e.target.files[0] });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };
// // 
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.keys(form).forEach(key => {
//       data.append(key, form[key]);
//     });

//     await axios.put("http://localhost:8000/api/kyc/", data, {
//       headers: {
//         "Authorization": "Bearer YOUR_TOKEN",
//         "Content-Type": "multipart/form-data"
//       }
//     });

//     alert("KYC submitted!");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="full_name" placeholder="Full Name" onChange={handleChange} />
//       <input type="date" name="date_of_birth" onChange={handleChange} />
//       <input name="document_type" placeholder="Document Type" onChange={handleChange} />
//       <input name="document_number" placeholder="Document Number" onChange={handleChange} />
//       <input type="file" name="document_image" onChange={handleChange} />
//       <input type="file" name="selfie_image" onChange={handleChange} />

//       <button type="submit">Submit KYC</button>
//     </form>
//   );
// }