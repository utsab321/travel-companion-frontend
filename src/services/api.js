import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true, // for Django session auth
});

export const loginUser = (data) => API.post("/login/", data);
export const getTrips = () => API.get("/trips/");
export default API;