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
        <li><Link to="/edit/1">Edit Post</Link></li>
       

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
  },
  title: {
    margin: 0,
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
  },
};

export default Navbar;
