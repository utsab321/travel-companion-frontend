import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setMessage("");
  };

  const validate = () => {
    const err = {};

    if (!form.username) err.username = "Username required";
    if (!form.password) err.password = "Password required";

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      // ===============================
      // ✅ CASE 1: JWT (SimpleJWT)
      // ===============================
      if (res.data.access) {
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh || "");
        localStorage.setItem("isLoggedIn", "true");

        setMessage("Login successful");
        navigate("/");
        return;
      }

      // ===============================
      // ✅ CASE 2: Token auth
      // ===============================
      if (res.data.token) {
        localStorage.setItem("access", res.data.token);
        localStorage.setItem("isLoggedIn", "true");

        setMessage("Login successful");
        navigate("/");
        return;
      }

      // ===============================
      // ✅ CASE 3: Session login
      // ===============================
      if (res.data.success) {
        localStorage.setItem("isLoggedIn", "true");

        setMessage("Login successful");
        navigate("/");
        return;
      }

      // ===============================
      // ❌ UNKNOWN RESPONSE
      // ===============================
      setMessage("Login failed: Invalid response from server");
    } catch (err) {
      console.log("LOGIN ERROR:", err);

      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Server error";

      setMessage(errorMsg);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.username && <p style={styles.error}>{errors.username}</p>}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />
        {errors.password && <p style={styles.error}>{errors.password}</p>}

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    width: "300px",
    margin: "80px auto",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "12px",
    margin: 0,
  },
  message: {
    marginTop: "10px",
    color: "green",
  },
};

export default Login;