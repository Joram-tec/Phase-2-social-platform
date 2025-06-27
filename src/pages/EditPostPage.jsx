import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'https://phase-2-social-platform-backend.onrender.com/api';

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', imageUrl: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost({
          title: data.title,
          content: data.content,
          imageUrl: data.imageUrl || ''
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(post)
    })
    .then(() => navigate('/posts'))
    .catch(error => console.error('Error updating post:', error));
  };

  if (isLoading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Title</label>
          <input
            value={post.title}
            onChange={(e) => setPost({...post, title: e.target.value})}
            placeholder="Title"
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={post.content}
            onChange={(e) => setPost({...post, content: e.target.value})}
            placeholder="Content"
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL (optional)</label>
          <input
            value={post.imageUrl}
            onChange={(e) => setPost({...post, imageUrl: e.target.value})}
            placeholder="Image URL"
          />
          {post.imageUrl && (
            <div className="image-preview">
              <img src={post.imageUrl} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
            </div>
          )}
        </div>
        <button type="submit" className="submit-btn">Update Post</button>
        <button type="button" className="cancel-btn" onClick={() => navigate('/posts')}>
          Cancel
        </button>
      </form>
    </div>
  );
}