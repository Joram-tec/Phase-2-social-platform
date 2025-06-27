import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostListPage.css';

const API_URL = 'https://phase-2-social-platform-backend.onrender.com/api';

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = () => {
    fetch(`${API_URL}/posts`)
      .then(res => res.json())
      .then(data => setPosts(data.posts || []))
      .catch(error => console.error('Error fetching posts:', error));
  };

  useEffect(fetchPosts, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(() => fetchPosts())
      .catch(error => console.error('Error deleting post:', error));
    }
  };

  const toggleFavorite = (id, isCurrentlyFavorite) => {
    fetch(`${API_URL}/posts/${id}/favorite`, {
      method: isCurrentlyFavorite ? 'DELETE' : 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(() => fetchPosts())
    .catch(error => console.error('Error toggling favorite:', error));
  };

  return (
    <div className="container">
      <h1>All Posts</h1>
      <button onClick={() => navigate('/add-post')}>Add New Post</button>
      <div className="posts">
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="post">
              {post.imageUrl && <img src={post.imageUrl} alt={post.title} onError={(e) => e.target.style.display = 'none'} />}
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="post-actions">
                <button onClick={() => navigate(`/edit-post/${post.id}`)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(post.id)}>Delete</button>
                <button 
                  className={post.isFavorite ? 'favorite active' : 'favorite'}
                  onClick={() => toggleFavorite(post.id, post.isFavorite)}
                >
                  {post.isFavorite ? '★' : '☆'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}