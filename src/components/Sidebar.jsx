function App() {
  return (
    <Router>
      <Navbar />  {/* always visible */}

      <div className="flex min-h-screen">
        <Routes>
          {/* Sidebar only on these paths */}
          <Route path="/dashboard" element={<Sidebar />} />
          <Route path="/create-trip" element={<Sidebar />} />
          <Route path="/profile" element={<Sidebar />} />
          {/* ... add others you want sidebar on */}
        </Routes>

        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* ... all other routes */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}