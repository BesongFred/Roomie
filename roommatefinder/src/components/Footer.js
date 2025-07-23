import "./Footer.css";

function Footer() {
  return (
    <div className='footer-container'>
      <p className='footer'>
        &copy; {new Date().getFullYear()} Roommate Finder. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;