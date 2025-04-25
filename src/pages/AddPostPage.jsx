import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function AddPost() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    isFavorite: false,
    isBlocked: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

      fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(() => {
        navigate('/posts');
      })
      .catch((error) => {
        console.error('Error adding post:', error);
        alert('Failed to add post. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Create New Post</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title*</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author*</label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content*</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="5"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="isFavorite"
              name="isFavorite"
              checked={formData.isFavorite}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isFavorite">
              Mark as Favorite
            </label>
          </div>

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="isBlocked"
              name="isBlocked"
              checked={formData.isBlocked}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isBlocked">
              Block Post
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

export default AddPost;
