import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://phase-2-social-platform-backend.onrender.com/api/posts/${id}`)
      .then(res => { if (!res.ok) throw new Error('Post not found'); return res.json(); })
      .then(data => { setPost(data); setTitle(data.title); setContent(data.content); setImageUrl(data.imageUrl); })
      .catch(err => setError(err.message));
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`https://phase-2-social-platform-backend.onrender.com/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      body: JSON.stringify({ title, content, image_url: imageUrl })
    })
    .then(res => { if (!res.ok) throw new Error('Update failed'); return res.json(); })
    .then(() => navigate('/'))
    .catch(err => setError(err.message));
  };

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!post) return <div>Loading post...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
}

export default EditPostPage;
