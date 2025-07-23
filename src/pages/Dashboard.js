import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Dashboard.css";

function Dashboard() {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    profile_picture: "",
    bio: "",
    preferences: {
      Age_range: "",
      Gender: "",
      Pet: "",
      Late_Nights: "",
      Smoking: "",
      Drinking: "",
      Guests_policy: "",
      noise_tolerance: "",
      Religion: "",
      Occupation: "",
    },
  });

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  const [filters, setFilters] = useState({
    ageRange: "",
    gender: "",
    pet: "",
    lateNights: "",
    smoking: "",
    drinking: "",
    guestsPolicy: "",
    noiseTolerance: "",
    religion: "",
    occupation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      ageRange: "",
      gender: "",
      pet: "",
      lateNights: "",
      smoking: "",
      drinking: "",
      guestsPolicy: "",
      noiseTolerance: "",
      religion: "",
      occupation: "",
    });
    setFilteredListings(listings);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/listings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setListings(data);
        setFilteredListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };
    fetchListings();
  }, [token]);

  const handleApplyFilter = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(filters);
    try {
      const res = await fetch(`http://localhost:5000/api/filter?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setFilteredListings(data);
    } catch (err) {
      console.error("Filter failed", err);
    }
  };

  return (
    <>
      <div className={`search-container ${data.fname !== "" ? "modal-active" : ""}`}>
        <Header />

        <main className="search-content">
          <h1 className="title">Your space, your rules — find who fits</h1>

          <form className="preferences" onSubmit={handleApplyFilter}>
            <select name="ageRange" value={filters.ageRange} onChange={handleChange}>
              <option value="" disabled >Age-Range</option>
              <option value="18-21">18-21</option>
              <option value="22-25">22-25</option>
              <option value="26-29">26-29</option>
              <option value="30-33">30-33</option>
            </select>

            <select name="gender" value={filters.gender} onChange={handleChange}>
              <option value="" disabled >Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select name="pet" value={filters.pet} onChange={handleChange}>
              <option value="" disabled >Pets</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <select name="lateNights" value={filters.lateNights} onChange={handleChange}>
              <option value="" disabled >Late Nights</option>
              <option value="Yes">Yes</option>
              <option value="Sometimes">Sometimes</option>
              <option value="No">No</option>
            </select>

            <select name="smoking" value={filters.smoking} onChange={handleChange}>
              <option value="" disabled >Smoking</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <select name="drinking" value={filters.drinking} onChange={handleChange}>
              <option value="" disabled >Drinking</option>
              <option value="Yes">Yes</option>
              <option value="Sometimes">Sometimes</option>
              <option value="No">No</option>
            </select>

            <select name="guestsPolicy" value={filters.guestsPolicy} onChange={handleChange}>
              <option value="" disabled >Guests Policy</option>
              <option value="Often">Often</option>
              <option value="Very Often">Very Often</option>
              <option value="Rarely">Rarely</option>
            </select>

            <select name="noiseTolerance" value={filters.noiseTolerance} onChange={handleChange}>
              <option value="" disabled >Noise Tolerance</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <select name="religion" value={filters.religion} onChange={handleChange}>
              <option value="" disabled >Religion</option>
              <option value="Christian">Christian</option>
              <option value="Muslim">Muslim</option>
              <option value="Others">Others</option>
            </select>

            <select name="occupation" value={filters.occupation} onChange={handleChange}>
              <option value="" disabled >Occupation</option>
              <option value="Student">Student</option>
              <option value="Worker">Worker</option>
            </select>

            <button type="submit">Apply Filter</button>
            <button type="button" onClick={handleReset}>Reset</button>
          </form>

          <div className="results-container">
            {filteredListings.map((listing) => (
              <div key={listing._id} className="result-card">
                <img src={listing.image} alt={listing.fname} className="clickable-img" />
                <p className="name-label">
                  <strong>{listing.fname}</strong>
                </p>
                <button className="connect-btn">Calculate</button>
              </div>
            ))}
          </div>

          {filteredListings.length < listings.length && (
            <div className="reset-btn-container">
              <button className="reset-btn" onClick={handleReset}>🔄 Show All Listings</button>
            </div>
          )}

          <section className="more-options">
            <h2 className="more-options-title">What Are You Looking For?</h2>
            <div className="more-options-grid">
              <Link to="/find-roommate" className="option-card">
                <h3>🔍 Find a Roommate</h3>
                <p>Browse profiles of compatible roommates near you.</p>
              </Link>
              <Link to="/list-your-room" className="option-card">
                <h3>🏡 List Your Room</h3>
                <p>Have a room? Post it and connect with potential roommates.</p>
              </Link>
              <Link to="/verified-roommates" className="option-card">
                <h3>👯‍♂️ Meet Verified Roommates</h3>
                <p>Chat with people who have verified their profiles.</p>
              </Link>
            </div>
          </section>

          <section className="support-link-bottom center-support">
            <Link to="/support" className="action-card">🛡️ Help & Support</Link>
          </section>
        </main>

        <Footer />
      </div>

      {data.fname && (
        <div className="modal-overlay" onClick={() => setData({ ...data, fname: "" })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="favorite-icon" title="Add to favorites">❤️</span>
              <span
                className="close-icon"
                onClick={() => setData({ ...data, fname: "" })}
                title="Close"
              >✖</span>
            </div>
            <img
              src={`http://localhost:5000/uploads/${data.profile_picture}`}
              alt={data.fname}
            />
            <p><strong>{data.fname} {data.lname}</strong></p>
            <p><strong>{data.bio}</strong></p>
            <button>Message</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
