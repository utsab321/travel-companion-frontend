import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = { username: "", password: "" };
    let isValid = true;

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (form.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/users/api/login/",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.success) {
        setMessage("Login successful");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", form.username.trim());
        navigate("/");
      } else {
        setMessage(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.detail ||
        "Server error. Please try again later.";
      setMessage(errorMsg);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <div style={styles.field}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            style={styles.input}
            autoComplete="username"
          />
          {errors.username && (
            <span style={styles.error}>{errors.username}</span>
          )}
        </div>

        <div style={styles.field}>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            autoComplete="current-password"
          />
          {errors.password && (
            <span style={styles.error}>{errors.password}</span>
          )}
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      {message && (
        <p style={message.includes("successful") ? styles.success : styles.error}>
          {message}
        </p>
      )}

      <p style={styles.link}>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

const styles = {
  container: {
    width: "320px",
    margin: "80px auto",
    padding: "2rem 1.5rem",
    textAlign: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },

  field: {
    textAlign: "left",
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box",
  },

  button: {
    padding: "12px",
    fontSize: "1.05rem",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "0.5rem",
  },

  error: {
    color: "#d32f2f",
    fontSize: "0.85rem",
    marginTop: "4px",
    display: "block",
  },

  success: {
    color: "#2e7d32",
    marginTop: "1rem",
    fontWeight: "500",
  },

  link: {
    marginTop: "1.5rem",
    fontSize: "0.95rem",
  },
};

export default Login;