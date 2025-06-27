import { useState, useEffect } from 'react';

function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://phase-2-social-platform-backend.onrender.com/api/posts') // No creds
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div className="post-list-container">
      <h1>All Posts</h1>
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <h2>{post.title}</h2>
          <p>{post.author}</p>
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
        </div>
      ))}
    </div>
  );
}

export default PostListPage;
