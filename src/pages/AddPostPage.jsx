import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://phase-2-social-platform-backend.onrender.com/api';

export default function AddPostPage() {
  const [post, setPost] = useState({ title: '', content: '', image_url: '' });
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: post.title.trim(),
      content: post.content.trim(),
      image_url: post.image_url?.trim() || null,
    };

    console.log("Sending payload:", payload);

    fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // ✅ No Authorization header needed
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          console.error("Backend responded with error:", data);
          throw new Error(data?.error || 'Failed to create post');
        }
        return data;
      })
      .then(() => {
        setPost({ title: '', content: '', image_url: '' });
        navigate('/posts');
      })
      .catch(error => console.error('❌ Error creating post:', error.message));
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
            value={post.image_url}
            onChange={(e) => {
              setPost({ ...post, image_url: e.target.value });
              setImageError(false);
            }}
            placeholder="Image URL"
          />
          {post.image_url && !imageError && (
            <div className="image-preview">
              <img
                src={post.image_url}
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
