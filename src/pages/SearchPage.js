import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./SearchPage.css";

function SearchPage() {
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
      Occupation: ""
    }
  });
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  /*Filtering options*/
  const [ageRange, setAgeRange] = useState("");
  const [gender, setGender] = useState("");
  const [pet, setPet] = useState("");
  const [lateNights, setLateNights] = useState("");
  const [smoking, setSmoking] = useState("");
  const [drinking, setDrinking] = useState("");
  const [guestsPolicy, setGuestsPolicy] = useState("");
  const [noiseTolerance, setNoiseTolerance] = useState("");
  const [religion, setReligion] = useState("");
  const [occupation, setOccupation] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/listings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        setToken(token);

        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    fetchListings();
  }, [token]);

  const handleApplyFilter = async (e) => {
    e.preventDefault();

    const filterPayload = {
      ageRange,
      gender,
      pet,
      lateNights,
      smoking,
      drinking,
      guestsPolicy,
      noiseTolerance,
      religion,
      occupation
    };

    try {
      const response = await fetch("http://localhost:5000/api/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(filterPayload)
      });

      const data = await response.json();
      setFilteredListings(data);
    } catch (error) {
      console.error("Error sending filters:", error);
    }
  };

  const handleReset = () => {
    setAgeRange("");
    setGender("");
    setPet("");
    setLateNights("");
    setSmoking("");
    setDrinking("");
    setGuestsPolicy("");
    setNoiseTolerance("");
    setReligion("");
    setOccupation("");
  };
  return (
    <>
      {/* Blurred content when modal is active */}
      <div
        className={`search-containers ${
          data.fname !== "" ? "modal-actives" : ""
        }`}
      >
        <Header />

        <main className='search-contents'>
          <h1 className='titles'>Your space, your rules — find who fits</h1>

          {/* === Search Preferences === */}
          <div className='preferencess'>
            {/* <input
              className='option'
              list='age-options'
              placeholder='Age-Range'
            /> */}
            <select
              id='age-options'
              value={ageRange}
              onChange={(e) => {
                console.log(e.target.value);
                setAgeRange(e.target.value);
              }}
            >
              <option value='' disabled>
                Age Range
              </option>
              <option value='18-21'>18-21</option>
              <option value='22-25'>22-25</option>
              <option value='26-29'>26-29</option>
              <option value='30-33'>30-33</option>
            </select>

            <select
              id='gender-options'
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option value='' disabled>
                Gender
              </option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>

            <select
              id='pets-options'
              value={pet}
              onChange={(e) => {
                setPet(e.target.value);
              }}
            >
              <option value='' disabled>
                Pets
              </option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>

            <select
              id='late-nights-options'
              value={lateNights}
              onChange={(e) => {
                setLateNights(e.target.value);
              }}
            >
              <option value='' disabled>
                Late Nights
              </option>
              <option value='Yes'>Yes</option>
              <option value='Sometimes'>Sometimes</option>
              <option value='No'>No</option>
            </select>

            <select
              id='smoking-options'
              value={smoking}
              onChange={(e) => {
                setSmoking(e.target.value);
              }}
            >
              <option value='' disabled>
                Smoking
              </option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>

            <select
              id='drinking-options'
              value={drinking}
              onChange={(e) => {
                setDrinking(e.target.value);
              }}
            >
              <option value='' disabled>
                Drinking
              </option>
              <option value='Yes'>Yes</option>
              <option value='Sometimes'>Sometimes</option>
              <option value='No'>No</option>
            </select>

            <select
              id='guests-policy-options'
              value={guestsPolicy}
              onChange={(e) => {
                setGuestsPolicy(e.target.value);
              }}
            >
              <option value='' disabled>
                Guests Policy
              </option>
              <option value='Often'>Often</option>
              <option value='Very Often'>Very Often</option>
              <option value='Rarely'>Rarely</option>
            </select>

            <select
              id='noise-tolerance-options'
              value={noiseTolerance}
              onChange={(e) => {
                setNoiseTolerance(e.target.value);
              }}
            >
              <option value='' disabled>
                Noise Tolerance
              </option>
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
            </select>

            <select
              id='religion-options'
              value={religion}
              onChange={(e) => {
                setReligion(e.target.value);
              }}
            >
              <option value='' disabled>
                Religion
              </option>
              <option value='Christian'>Christian</option>
              <option value='Muslim'>Muslim</option>
              <option value='Others'>Others</option>
            </select>

            <select
              id='occupation-options'
              value={occupation}
              onChange={(e) => {
                setOccupation(e.target.value);
              }}
            >
              <option value='' disabled>
                Occupation
              </option>
              <option value='Student'>Student</option>
              <option value='Worker'>Worker</option>
            </select>

            <button className='filters' onClick={handleApplyFilter}>
              Apply Filter
            </button>
            <button className='resets' onClick={handleReset}>
              Reset
            </button>
          </div>

          {/* === Results Section === */}
          <div className='results-containers'>
            {filteredListings &&
              filteredListings.map((listing) => (
                <div key={listing.id} className='result-cards'>
                  <img
                    src={listing.image}
                    alt={listing.fname}
                    onClick={() => setFilteredListings(listing)}
                    className='clickable-imgs'
                  />
                  <p className='name-labels'>
                    <strong>{listing.fname}</strong>
                  </p>
                  <button className='connect-btns'>Calculate</button>
                </div>
              ))}
          </div>

          {/* === Reset Listings Button === */}
          {filteredListings && filteredListings.length < listings.length && (
            <div className='reset-btn-containers'>
              <button className='reset-btns' onClick={handleReset}>
                🔄 Show All Listings
              </button>
            </div>
          )}

          {/* === More Options Section === */}
          <section className='more-options'>
            <h2 className='more-options-titless'>What Are You Looking For?</h2>
            <div className='more-options-grids'>
              <Link to='/find-roommate' className='option-cards'>
                <h3>🔍 Find a Roommate</h3>
                <p>Browse profiles of compatible roommates near you.</p>
              </Link>
              <Link to='/list-your-room' className='option-cards'>
                <h3>🏡 List Your Room</h3>
                <p>
                  Have a room? Post it and connect with potential roommates.
                </p>
              </Link>
              <Link to='/verified-roommates' className='option-cards'>
                <h3>👯‍♂️ Meet Verified Roommates</h3>
                <p>Chat with people who have verified their profiles.</p>
              </Link>
            </div>
          </section>

          {/* === Help & Support Link === */}
          <section className='support-link-bottoms center-supports'>
            <Link to='/support' className='action-cards'>
              🛟 Help & Support
            </Link>
          </section>
        </main>

        <Footer />
      </div>

      {data.fname !== "" && (
        <div
          className='modal-overlays'
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setData(null);
            }
          }}
        >
          <div className='modal-contents' onClick={(e) => e.stopPropagation()}>
            <div className='modal-headers'>
              <span className='favorite-icons' title='Add to favorites'>
                ❤️
              </span>
              <span
                className='close-icons'
                onClick={() => setData(null)}
                title='Close'
              >
                ✖
              </span>
            </div>

            <img
              src={`http://localhost:5000/uploads/${data.profile_picture}`}
              alt={data.fname}
            />

            <p>
              <strong>{data.fname}</strong> <strong>{data.lname}</strong>
            </p>

            <p>
              <strong>{data.bio}</strong>
            </p>
            <button>Message</button>
          </div>
        </div>
      )}
    </>
  );
}

export default SearchPage;
