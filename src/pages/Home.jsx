import { useEffect, useState } from "react";
import bg from "../assets/bg.png";

// MUI imports
import { Box, Typography, Container, Button, TextField, Grid, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PeopleIcon from "@mui/icons-material/People";
import RoomIcon from "@mui/icons-material/Room";
import ShieldIcon from "@mui/icons-material/Shield";

export default function Home() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/destinations/")
      .then((response) => response.json())
      .then((data) => setDestinations(data));
  }, []);

  return (
    <Box sx={{ fontFamily: "Poppins, sans-serif", color: "#1a1a2e", background: "#f8f6f1" }}>
      
      {/* HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Background */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            zIndex: 0,
          }}
        />
        {/* Gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 50%, rgba(10,15,30,0.92) 100%)",
            zIndex: 1,
          }}
        />

        {/* Hero Content */}
        <Box sx={{ position: "relative", zIndex: 2, maxWidth: 760, px: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: "#fff",
              mb: 2,
              lineHeight: 1.2,
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            Find Your Partner<br />
            <Box component="span" sx={{ color: "#ffd580" }}>
              for the Adventure
            </Box>
          </Typography>

          <Typography
            sx={{ color: "rgba(255,255,255,0.75)", fontWeight: 300, mb: 3 }}
          >
            Connect with like-minded travelers, plan trips together,
            <br />
            and explore the world — one journey at a time.
          </Typography>

          {/* Search Bar */}
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              p: "8px 24px",
              borderRadius: "100px",
              maxWidth: 560,
              mx: "auto",
              mb: 4,
            }}
            elevation={6}
          >
            <SearchIcon sx={{ color: "#9ca3af", mr: 1 }} />
            <TextField
              variant="standard"
              placeholder="Search destination, people, or trips…"
              InputProps={{ disableUnderline: true }}
              sx={{ flex: 1 }}
            />
            <Button
              sx={{
                ml: 2,
                background: "linear-gradient(135deg, #f97316, #ea580c)",
                color: "#fff",
                borderRadius: "100px",
                px: 3,
                py: 1,
                textTransform: "none",
                "&:hover": { background: "linear-gradient(135deg, #ea580c, #f97316)" },
              }}
            >
              Explore →
            </Button>
          </Paper>

          {/* Scroll Cue */}
          <Box
            sx={{
              position: "absolute",
              bottom: 32,
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
              fontSize: 12,
              textTransform: "uppercase",
              animation: "bounce 2s infinite",
            }}
          >
            <Typography>Scroll</Typography>
            <ArrowDownwardIcon fontSize="small" />
          </Box>
        </Box>
      </Box>

      {/* DESTINATIONS */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Destinations
        </Typography>
        <Grid container spacing={2}>
          {destinations.map((d) => (
            <Grid item key={d.id} xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">{d.name}</Typography>
                <Typography variant="body2">{d.country}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FEATURES SECTION */}
      <Box sx={{ background: "#111827", py: 12 }}>
        <Container>
          <Typography
            sx={{ color: "#ffd580", textTransform: "uppercase", fontWeight: 600, mb: 1 }}
          >
            Why Travel Sathi?
          </Typography>
          <Typography variant="h4" sx={{ color: "#fff", mb: 6 }}>
            Your journey, <Box component="span" sx={{ color: "#ffd580", fontStyle: "italic" }}>elevated</Box>
          </Typography>

          <Grid container spacing={4}>
            {[
              { icon: <PeopleIcon sx={{ color: "#ffd580" }} />, title: "Smart Matching", desc: "Connect with travelers who share your pace and interests", tag: "AI-Powered" },
              { icon: <RoomIcon sx={{ color: "#ffd580" }} />, title: "Trip Planning", desc: "Build itineraries together in real time", tag: "Collaborative" },
              { icon: <ShieldIcon sx={{ color: "#ffd580" }} />, title: "Safe & Verified", desc: "Verified members and 24/7 support keep you safe", tag: "Trusted" },
            ].map(({ icon, title, desc, tag }) => (
              <Grid item xs={12} sm={6} md={4} key={title}>
                <Paper
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    "&:hover": { transform: "translateY(-6px)", borderColor: "rgba(255,213,128,0.3)" },
                    transition: "transform 0.3s, border-color 0.3s",
                  }}
                >
                  <Box sx={{ width: 52, height: 52, mb: 2, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2, background: "rgba(255,213,128,0.1)" }}>
                    {icon}
                  </Box>
                  <Typography sx={{ color: "#ffd580", fontWeight: 700, fontSize: 12, textTransform: "uppercase", mb: 1 }}>{tag}</Typography>
                  <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>{title}</Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>{desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}