import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Add more routes below as needed */}
        {/* Example:
          <Route path="/signup" element={<Signup />} />
          <Route path="/listings" element={<Listings />} />
        */}

        {/* Optional fallback route */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
