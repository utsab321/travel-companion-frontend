import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BsNavbar from "react-bootstrap/Navbar";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Brand */}
        <BsNavbar.Brand as={Link} to="/home">
          Travel Sathi
        </BsNavbar.Brand>

        <BsNavbar.Toggle />

        <BsNavbar.Collapse>
          {/* Center Links */}
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/explore">Explore</Nav.Link>
          </Nav>

          {/* Right Side */}
          <Nav>
            {user ? (
              <div ref={dropdownRef} style={{ position: "relative" }}>
                {/* Avatar */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    borderRadius: "50%",
                    width: "35px",
                    height: "35px",
                    border: "none",
                    background: "#1976D2",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {user.first_name?.[0] || "U"}
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "45px",
                      background: "#222",
                      padding: "10px",
                      borderRadius: "8px",
                      minWidth: "150px",
                    }}
                  >
                    <div style={{ color: "#fff", marginBottom: "8px" }}>
                      {user.first_name} {user.last_name}
                    </div>

                    <Link to="/profile" className="dropdown-item text-white">
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="dropdown-item text-danger"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;