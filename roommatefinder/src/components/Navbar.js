// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import ListingsPage from '../pages/ListingsPage';
export default function Navbar() {
  const { pathname } = useLocation();

  const isAuthPage = ["/login", "/forgot-password"].includes(pathname);

  if (isAuthPage) return null; // Hide navbar on auth pages

  return (
    <nav className="bg-blue-800 text-white px-6 py-4 shadow-md sticky top-0 z-50 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-white">
        ⚡ Roommate finder
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {/* <Link to="/about" className="hover:underline">About</Link> */}
        <Link to="/ContactUs" className="hover:underline">Contact</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/listingspage" className="hover:underline">ListingsPage</Link>
        <Link to="/service" className="hover:underline">Services</Link>
        <Link to="/AboutPage" className="hover:underline">AboutPage</Link>
              </div>
    </nav>
  );
}
