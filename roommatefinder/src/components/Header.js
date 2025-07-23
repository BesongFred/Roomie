import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className='header-container'>
      <div className='logo'>Roommate Finder</div>
      <nav className='navbar'>
        <ul>
          <li>
            <Link to='#features'>Features</Link>
          </li>
          <li>
            <Link to='#how'>How It Works</Link>
          </li>
          <li>
            <Link to='/login'>profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;