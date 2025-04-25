import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://json-server-dashboard-gamma.vercel.app/posts')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="post-list-container">
      <h1>All Posts</h1>

      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {filteredPosts.length === 0 ? (
        <p className="no-posts">No posts found</p>
      ) : (
        filteredPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.author}</p>
            <img alt="image" src={post.content} />
            <button>
              <Link to={`/edit/${post.id}`} style={{ color: 'white' }}>Edit</Link>
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default PostListPage;