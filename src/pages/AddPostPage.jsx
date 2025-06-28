import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://phase-2-social-platform-backend.onrender.com/api';

export default function AddPostPage() {
  const [post, setPost] = useState({ title: '', content: '', imageUrl: '' });
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token') || 'demo-token'}`  // fallback token if unauth
      },
      body: JSON.stringify(post)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to create post');
      }
      return res.json();
    })
    .then(() => {
      setPost({ title: '', content: '', imageUrl: '' });
      navigate('/posts'); // Go to Post List
    })
    .catch(error => console.error('Error creating post:', error));
  };

  return (
    <div className="container">
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Title"
            required
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            placeholder="Content"
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL (optional)</label>
          <input
            type="url"
            value={post.imageUrl}
            onChange={(e) => {
              setPost({ ...post, imageUrl: e.target.value });
              setImageError(false);
            }}
            placeholder="Image URL"
          />
          {post.imageUrl && !imageError && (
            <div className="image-preview">
              <img
                src={post.imageUrl}
                alt="Preview"
                onError={() => setImageError(true)}
                style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }}
              />
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">Create Post</button>
        <button
          type="button"
          className="cancel-btn"
          onClick={() => navigate('/posts')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
