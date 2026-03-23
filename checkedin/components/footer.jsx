//footer is created in order to stick to the bottom of the page 




import "./footer.css";


export default function Footer() {
  return (
    <footer className="footer">
      
      <div className="footer-container">

        <div className="footer-brand">
          <h2>CheckedIn</h2>
          <p>Smarter Check-Ins - Better Workforce Management</p>
        </div>
         </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} CheckedIn. All rights reserved.<br />
        Built With Passion In California , United States 🇺🇸
      </div>

    </footer>
  );
}