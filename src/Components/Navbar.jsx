import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.title}>Social Dashboard</h2>
      <ul style={styles.links}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/posts/1" style={styles.link}>Posts</Link></li>
        <li><Link to="/favourites" style={styles.link}>Favourites</Link></li>
        <li><Link to="/add" style={styles.link}>Add Post</Link></li>
        <li><Link to="/edit/1" style={styles.link}>Edit Post</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#24292f",
    color: "white",
    position: "fixed",  
    top: 0,
    left: 0,
    width: "100%",  
    zIndex: 1000,  
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
  },
  title: {
    margin: 0,
    fontSize: "1.5rem", 
  },
  links: {
    display: "flex",
    gap: "1rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",  
    transition: "color 0.3s",  
  },
  linkHover: {
    color: "#f39c12", 
  }
};

export default Navbar;

