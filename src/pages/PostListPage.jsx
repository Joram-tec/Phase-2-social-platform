import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostListPage.css';

const API_URL = 'https://phase-2-social-platform-backend.onrender.com/api';

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = () => {
    setLoading(true);
    fetch(`${API_URL}/posts`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
      })
      .then(data => {
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error('Error:', err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
      // No headers needed since this is unlocked for frontend
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete post');
        fetchPosts();
      })
      .catch(err => alert('Delete failed: ' + err.message));
  };

  const toggleFavorite = (post) => {
    if (post.isFavorite) {
      fetch(`${API_URL}/favorites/${post.favoriteId}`, {
        method: 'DELETE',
      })
        .then(() => fetchPosts())
        .catch(err => alert('Unfavorite failed: ' + err.message));
    } else {
      fetch(`${API_URL}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: post.id }),
      })
        .then(() => fetchPosts())
        .catch(err => alert('Favorite failed: ' + err.message));
    }
  };

  return (
    <div className="container">
      <h1>All Posts</h1>
      <button onClick={() => navigate('/add')}>Add New Post</button>

      {loading && <p>Loading posts...</p>}

      <div className="posts">
        {!loading && posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="post">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    objectFit: 'cover',
                    marginBottom: '10px'
                  }}
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="post-actions">
                <button onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(post.id)}>Delete</button>
                <button
                  className={post.isFavorite ? 'favorite active' : 'favorite'}
                  onClick={() => toggleFavorite(post)}
                >
                  {post.isFavorite ? '★' : '☆'} Favorite
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
